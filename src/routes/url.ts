// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';

import { BaseRouter } from './base';

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
    public static async get(req: Request, res: Response, next: () => void) {
        try {

            const url: Url = await BaseRouter.urlService().get(req.query.shortUrl);

            res.json(url);

        } catch (err) {
            res.status(400).json({
                message: err.message,
            });
        }
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
    public static async post(req: Request, res: Response, next: () => void) {
        try {

            const url: Url = await BaseRouter.urlService().create(req.body.name, req.body.shortUrl, req.body.url, req.body.key);

            res.json(url);

        } catch (err) {
            res.status(400).json({
                message: err.message,
            });
        }
    }

    public static async redirect(req: Request, res: Response, next: () => void) {
        try {

            const referer: any = req.headers.referer || 'None';
            const acceptLanguage: any = req.headers['accept-language'];
            const userAgent: any = req.headers['user-agent'];

            const url: Url = await BaseRouter.urlService().getWithClick(req.params.shortUrl, referer, userAgent, acceptLanguage);

            res.redirect(301, url.url);

        } catch (err) {
            res.status(400).json({
                message: err.message,
            });
        }
    }
}
