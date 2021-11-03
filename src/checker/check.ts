import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Address, FlinkClient, Product } from '../api/client';
import { geocode } from '../api/geocode';
import { crypt } from './crypt';

const handleCheckRequest = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { checkerId, code } = req.body;

  const { cart, hub } = JSON.parse(
    crypt.decrypt(
      JSON.parse(Buffer.from(checkerId, 'base64').toString('ascii'))
    )
  );

  const client = new FlinkClient();

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

export { handleCheckRequest };
