import { Configuration } from './config/configuration';
import dotenv from 'dotenv';

declare var process: {
  env: {
    PORT: string;
  };
};

dotenv.config();

const config: Configuration = {
  port: parseInt(process.env.PORT),
};

export default config;
