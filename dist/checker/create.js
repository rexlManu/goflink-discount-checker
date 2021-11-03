"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCreationRequest = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("../api/client");
const crypt_1 = require("./crypt");
const geonames_js_1 = __importDefault(require("geonames.js"));
const handleCreationRequest = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { city, amount } = req.body;
    const client = new client_1.FlinkClient();
    const geonames = (0, geonames_js_1.default)({
        username: 'rexlmanu',
        lan: 'de',
        encoding: 'JSON',
    });
    geonames
        .search({ q: city })
        .then((geoResponse) => {
        const { lat, lng, name, countryCode } = geoResponse.geonames[0];
        return client
            .hubs({
            latitude: lat,
            longitude: lng,
        })
            .then((hub) => {
            client.setCurrentHub(hub);
            return client.products().then((products) => {
                let distAmount = 0;
                const distProducts = [];
                while (distAmount < amount) {
                    for (const product of products.sort((a, b) => a.price.amount - b.price.amount)) {
                        if (distProducts.indexOf(product) == -1) {
                            distAmount += product.price.amount;
                            distProducts.push(product);
                        }
                        if (distAmount > amount)
                            break;
                    }
                }
                const fakeAddress = {
                    city: name,
                    country: countryCode,
                    first_name: 'undefined',
                    last_name: 'undefined',
                    phone: '+4912345678788',
                    postal_code: '12345',
                    street_address_1: 'Straße 1',
                };
                return client
                    .createCart({
                    billing_address: fakeAddress,
                    shipping_address: fakeAddress,
                    delivery_coordinates: {
                        latitude: parseFloat(lat),
                        longitude: parseFloat(lng),
                    },
                    delivery_eta: '10',
                    email: 'object@object.de',
                    lines: distProducts.map((product) => {
                        return {
                            product_sku: product.sku,
                            quantity: 1,
                        };
                    }),
                })
                    .then((response) => {
                    res.status(201).json({
                        checkerId: Buffer.from(JSON.stringify(crypt_1.crypt.encrypt(JSON.stringify({
                            cart: response,
                            hub: client.currentHub,
                        })))).toString('base64'),
                    });
                });
            });
        });
    })
        .catch((e) => {
        console.log({ data: e.response.body });
        res.status(500).json({
            message: 'Response could not be made',
        });
    });
};
exports.handleCreationRequest = handleCreationRequest;
