import express from 'express';
import cors from 'cors';

import helmet from 'helmet';
import config from './config';
import { handleCreationRequest } from './checker/create';
import { body } from 'express-validator';
import { handleCheckRequest } from './checker/check';

const app = express();
const port = config.port;

const DIST_FOLDER = __dirname + '/../front/dist';

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(DIST_FOLDER));
app.use(express.static(__dirname + '/../public'));
app.get('/', (req, res) => res.sendFile(DIST_FOLDER + '/index.html'));

app.post(
  '/create-checker',
  body('city').not().isEmpty().trim().isAlphanumeric(),
  body('amount').default(18.2),
  handleCreationRequest
);

app.post(
  '/check',
  body('checkerId').isString(),
  body('code').isString(),
  handleCheckRequest
);

app.listen(port, () => {
  console.log(`Discount checker is listening on port ${port}.`);
});
