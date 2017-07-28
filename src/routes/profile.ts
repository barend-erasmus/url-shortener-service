// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as co from 'co';

// Import Repositories
import { ProfileRepository } from './../repositories/profile';

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
    public static get(req: Request, res: Response, next: () => void) {

        co(function* () {

            try {
                const host = 'developersworkspace.co.za';
                const username = 'url-shortener-service';
                const password = '3evS*E6sBj&!S#u_';
                const profileRepository: ProfileRepository = new ProfileRepository(host, username, password);
                const profileService: ProfileService = new ProfileService(profileRepository);

                if (!req.query.key) {
                    throw new Error('Name required');
                }

                const profile: Profile = yield profileService.get(req.query.key);

                res.json(profile);

            } catch (err) {
                res.status(400).json({
                    message: err.message
                });
            }
        });
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
    public static post(req: Request, res: Response, next: () => void) {

        co(function* () {

            try {
                const host = 'developersworkspace.co.za';
                const username = 'url-shortener-service';
                const password = '3evS*E6sBj&!S#u_';
                const profileRepository: ProfileRepository = new ProfileRepository(host, username, password);
                const profileService: ProfileService = new ProfileService(profileRepository);

                if (!req.body.key) {
                    throw new Error('Name required.');
                }

                const profile: Profile = yield profileService.create(req.body.name);

                res.json(profile);

            } catch (err) {
                res.status(400).json({
                    message: err.message
                });
            }
        });
    }
}