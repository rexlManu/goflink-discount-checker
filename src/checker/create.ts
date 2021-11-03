import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Address, FlinkClient, Product } from '../api/client';
import { geocode } from '../api/geocode';
import { crypt } from './crypt';
import Geonames from 'geonames.js';

const handleCreationRequest = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { city, amount } = req.body;

  const client = new FlinkClient();
  const geonames = Geonames({
    username: 'rexlmanu',
    lan: 'de',
    encoding: 'JSON',
  });

  geonames
    .search({ q: city })
    .then((geoResponse: any) => {
      const { lat, lng, name, countryCode } = geoResponse.geonames[0];

      return client
        .hubs({
          latitude: lat,
          longitude: lng,
        })
        .then((hub) => {
          client.setCurrentHub(hub);
          return client.products().then((products: Product[]) => {
            let distAmount = 0;
            const distProducts: Product[] = [];
            while (distAmount < amount) {
              for (const product of products.sort(
                (a, b) => a.price.amount - b.price.amount
              )) {
                if (distProducts.indexOf(product) == -1) {
                  distAmount += product.price.amount;
                  distProducts.push(product);
                }

                if (distAmount > amount) break;
              }
            }

            const fakeAddress: Address = {
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
              .then((response: any) => {
                res.status(201).json({
                  checkerId: Buffer.from(
                    JSON.stringify(
                      crypt.encrypt(
                        JSON.stringify({
                          cart: response,
                          hub: client.currentHub,
                        })
                      )
                    )
                  ).toString('base64'),
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

export { handleCreationRequest };
