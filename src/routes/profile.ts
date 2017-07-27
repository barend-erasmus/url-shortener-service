// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as co from 'co';

// Import Repositories
import { ProfileRepository } from './../repositories/profile';

// Imports services
import { ProfileService } from './../services/profile';

// Imports models
import { Profile } from './../models/profile';

export class ProfileRouter {

    /**
     * @api {get} /api/profile Get Profile by Key
     * @apiName GetProfile
     * @apiGroup Profile
     *     
     * @apiParam {String} key Profile Key
     *
     * @apiSuccess {String} name Name of Profile.
     * @apiSuccess {String} key Key of Profile.
     * @apiSuccess {Object[]} urls List of Urls.
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "name": "My Company",
     *       "key": "yVSs6FhJ",
     *       "urls": [{
     *                  "name": "My Test Site",
     *                  "shortUrl": "My-Test-Site",
     *                  "url": "http://example.com/hello-world"
     *              }]
     *     }
     */
    public static get(req: Request, res: Response, next: () => void) {

        co(function* () {

            const host = 'developersworkspace.co.za';
            const username = 'url-shortener-service';
            const password = '3evS*E6sBj&!S#u_';
            const profileRepository: ProfileRepository = new ProfileRepository(host, username, password);
            const profileService: ProfileService = new ProfileService(profileRepository);
            const profile: Profile = yield profileService.get(req.query.key);

            res.json(profile);
        });
    }
}