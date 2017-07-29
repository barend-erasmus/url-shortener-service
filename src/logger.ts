// Imports
import * as path from 'path';
import * as winston from 'winston';
import * as yargs from 'yargs';

// Import configurations
import { config as devConfig } from './config';
import { config as prodConfig } from './config.prod';

const argv = yargs.argv;

let config = devConfig;
if (argv.prod) {
    config = prodConfig;
}

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'debug' }),
    new (winston.transports.File)({
      filename: path.join(config.logging.path, 'url-shortener-service.log'),
      level: 'debug',
    }),
  ],
});

// Exports
export { logger };
