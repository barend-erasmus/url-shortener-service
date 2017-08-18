// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';

import { BaseRouter } from './base';

// Imports services
import { ProfileService } from './../services/profile';

// Imports models
import { Profile } from './../entities/profile';

export class ProfileRouter {

    /**
     * @api {get} /api/profile Get Profile by Key
     * @apiName GetProfile
     * @apiGroup Profile
     *
     * @apiParam {String} key Key of the Profile
     *
     * @apiSuccess {String} name Name of the Profile
     * @apiSuccess {String} key Key of the Profile
     * @apiSuccess {Object[]} urls Urls of the Profile
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "name": "My Company",
     *       "key": "yVSs6FhJ"
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

            const profile: Profile = await BaseRouter.profileService().get(req.query.key);

            res.json(profile);

        } catch (err) {
            res.status(400).json({
                message: err.message,
            });
        }
    }

    /**
     * @api {post} /api/profile Create Profile
     * @apiName CreateProfile
     * @apiGroup Profile
     *
     * @apiParam {String} name Name of the Profile
     *
     * @apiSuccess {String} name Name of the Profile
     * @apiSuccess {String} key Key of the Profile.
     * @apiSuccess {Object[]} urls Urls of the Profile
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "name": "My Company",
     *       "key": "yVSs6FhJ"
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
            const profile: Profile = await BaseRouter.profileService().create(req.body.name);

            res.json(profile);

        } catch (err) {
            res.status(400).json({
                message: err.message,
            });
        }
    }
}
