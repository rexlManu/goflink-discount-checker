"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCheckRequest = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("../api/client");
const crypt_1 = require("./crypt");
const handleCheckRequest = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { checkerId, code } = req.body;
    const { cart, hub } = JSON.parse(crypt_1.crypt.decrypt(JSON.parse(Buffer.from(checkerId, 'base64').toString('ascii'))));
    const client = new client_1.FlinkClient();
    client.setCurrentHub(hub);
    client
        .addPromoCode(cart.id, code)
        .then((data) => {
        res.json({
            response: data,
        });
    })
        .catch((response) => {
        res.status(400).json({
            response: response,
        });
    });
};
exports.handleCheckRequest = handleCheckRequest;
