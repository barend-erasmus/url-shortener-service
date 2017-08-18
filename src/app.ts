// Imports
import * as express from "express";
import * as path from 'path';
import * as yargs from 'yargs';

// Imports middleware
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as expressWinston from 'express-winston';

// Imports routes
import { ProfileRouter } from './routes/profile';
import { UrlRouter } from './routes/url';

// Imports logger
import { logger } from './logger';

const argv = yargs.argv;

export class UrlShortenerServiceApi {

    constructor(private app: express.Express, private port: number) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
        this.configureErrorHandling(app);
    }

    public getApp() {
        return this.app;
    }

    public run() {
        this.app.listen(this.port);
    }

    private configureMiddleware(app: express.Express) {

        // Configure body-parser
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        // Configure CORS
        app.use(cors());

        // Configure express-winston
        app.use(expressWinston.logger({
            meta: false,
            msg: 'HTTP Request: {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}} {{req.ip}}',
            winstonInstance: logger,
        }));

        app.use('/api/docs', express.static(path.join(__dirname, './../apidoc')));
        app.use('/api/coverage', express.static(path.join(__dirname, './../coverage/lcov-report')));
    }

    private configureRoutes(app: express.Express) {
        app.get(`/api/profile`, ProfileRouter.get);
        app.post(`/api/profile`, ProfileRouter.post);
        app.get(`/api/url`, UrlRouter.get);
        app.post(`/api/url`, UrlRouter.post);
        app.get(`/:shortUrl`, UrlRouter.redirect);
    }

    private configureErrorHandling(app: express.Express) {
        app.use((err: Error, req: express.Request, res: express.Response, next: () => void) => {
            logger.error(err.message, err);
            res.status(500).send(err.message);
        });
    }
}

const api = new UrlShortenerServiceApi(express(), argv.port || 3000);
api.run();

logger.info(`listening on ${argv.port || 3000}`);
