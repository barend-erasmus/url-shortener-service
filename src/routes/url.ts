// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as co from 'co';

// Import Repositories
import { UrlRepository } from './../repositories/url';
import { ProfileRepository } from './../repositories/profile';

// Imports services
import { UrlService } from './../services/url';

// Imports models
import { Url } from './../entities/url';

export class UrlRouter {

    /**
     * @api {get} /api/url Get Url by ShortUrl
     * @apiName GetUrl
     * @apiGroup Url
     *     
     * @apiParam {String} shortUrl Short Url of the Url
     *
     * @apiSuccess {String} name Name of the Url
     * @apiSuccess {String} shortUrl Short Url of the Url
     * @apiSuccess {String} url Url of the Url
     * @apiSuccess {Object[]} clicks Clicks of the Url
     * 
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "name": "My Blog",
     *       "shortUrl": "my-blog",
     *       "url": "http://example.com",
     *       "clicks":  [{
     *                      "referer": "http://something.com",
     *                      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
     *                      "acceptLanguage": "en-US,en;q=0.8"
     *                   }]
     *     }
     * 
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 400 Bad Request
     *      {
     *          "message": "Your request was not understood"
     *      }
     */
    public static get(req: Request, res: Response, next: () => void) {

        co(function* () {

            try {
                const host = 'developersworkspace.co.za';
                const username = 'url-shortener-service';
                const password = '3evS*E6sBj&!S#u_';
                const urlRepository: UrlRepository = new UrlRepository(host, username, password);
                const profileRepository: ProfileRepository = new ProfileRepository(host, username, password);
                const urlService: UrlService = new UrlService(urlRepository, profileRepository);
                const url: Url = yield urlService.get(req.query.shortUrl);

                res.json(url);

            } catch (err) {
                res.status(400).json({
                    message: err.message
                });
            }
        });
    }

    /**
     * @api {post} /api/url Create Url 
     * @apiName CreateUrl
     * @apiGroup Url
     *     
     * @apiParam {String} name Url Name
     * @apiParam {String} shortUrl Short Url
     * @apiParam {String} url Url
     * @apiParam {String} key Key of Profile
     *
     * @apiSuccess {String} name Name of the Url
     * @apiSuccess {String} shortUrl Short Url of the Url
     * @apiSuccess {String} url Url of the Url
     * @apiSuccess {Object[]} clicks Clicks of the Url
     * 
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "name": "My Blog",
     *       "shortUrl": "my-blog",
     *       "url": "http://example.com",
     *       "clicks":  [{
     *                      "referer": "http://something.com",
     *                      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
     *                      "acceptLanguage": "en-US,en;q=0.8"
     *                   }]
     *     }
     * 
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 400 Bad Request
     *      {
     *          "message": "Your request was not understood"
     *      }
     */
    public static post(req: Request, res: Response, next: () => void) {

        co(function* () {

            try {
                const host = 'developersworkspace.co.za';
                const username = 'url-shortener-service';
                const password = '3evS*E6sBj&!S#u_';
                const urlRepository: UrlRepository = new UrlRepository(host, username, password);
                const profileRepository: ProfileRepository = new ProfileRepository(host, username, password);
                const urlService: UrlService = new UrlService(urlRepository, profileRepository);
                const url: Url = yield urlService.create(req.body.name, req.body.shortUrl, req.body.url, req.body.key);

                res.json(url);

            } catch (err) {
                res.status(400).json({
                    message: err.message
                });
            }
        });
    }

    public static redirect(req: Request, res: Response, next: () => void) {

        co(function* () {

            try {
                const host = 'developersworkspace.co.za';
                const username = 'url-shortener-service';
                const password = '3evS*E6sBj&!S#u_';
                const urlRepository: UrlRepository = new UrlRepository(host, username, password);
                const profileRepository: ProfileRepository = new ProfileRepository(host, username, password);
                const urlService: UrlService = new UrlService(urlRepository, profileRepository);

                const referer: any = req.headers['referer'] || 'None';
                const acceptLanguage: any = req.headers['accept-language'];
                const userAgent: any = req.headers['user-agent'];

                const url: Url = yield urlService.getWithClick(req.params.shortUrl, referer, userAgent, acceptLanguage);

                res.redirect(url.url);

            } catch (err) {
                res.status(400).json({
                    message: err.message
                });
            }
        });
    }
}