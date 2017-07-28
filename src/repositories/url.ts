// Imports
import * as co from 'co';
import { BaseRepository } from './base';

// Imports models
import { Url } from './../entities/url';
import { Click } from './../models/click';
import { Profile } from './../models/profile';

export class UrlRepository extends BaseRepository {

    constructor(host: string, username: string, password: string) {
        super(host, username, password);
    }

    public insert(url: Url): Promise<boolean> {
        const self = this;
        return co(function* () {
            yield BaseRepository.sequelize.authenticate();

            const profile = yield BaseRepository.models.Profile.find({
                where: {
                    key: url.profile.key
                }
            });

            if (!profile) {
                throw new Error('Profile does not exist.');
            }

            yield BaseRepository.models.Url.create({
                name: url.name,
                shortUrl: url.shortUrl,
                url: url.url,
                profileId: profile.id
            });

            return true;
        });
    }

    public insertClick(click: Click, shortUrl: string): Promise<boolean> {
        const self = this;
        return co(function* () {
            yield BaseRepository.sequelize.authenticate();

            const url = yield BaseRepository.models.Url.find({
                where: {
                    shortUrl: shortUrl
                }
            });

            if (!url) {
                throw new Error('Url does not exist.');
            }

            console.log(click);

            yield BaseRepository.models.Click.create({
                referer: click.referer,
                userAgent: click.userAgent,
                acceptLanguage: click.acceptLanguage,
                urlId: url.id
            });

            return true;
        });
    }

     public find(shortUrl: string): Promise<Url> {
        const self = this;

        return co(function* () {

            const url = yield BaseRepository.models.Url.find({
                where: {
                    shortUrl: shortUrl
                },
                include: [
                    { model: BaseRepository.models.Click, required: false },
                    { model: BaseRepository.models.Profile, required: false }
                ]
            });
            
            if (!url) {
                return null;
            }
            
            return new Url(url.name, url.shortUrl, url.url, url.clicks.map((x) => new Click(x.referer, x.userAgent, x.acceptLanguage)), new Profile(url.profile.name, url.profile.key));
        });
    }
}