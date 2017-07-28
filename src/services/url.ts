// Imports
import * as co from 'co';

// Imports models
import { Url } from './../entities/url';
import { Profile } from './../entities/profile';
import { Click } from './../models/click';

// Imports repositories
import { ProfileRepository } from './../repositories/profile';
import { UrlRepository } from './../repositories/url';

export class UrlService {

    constructor(private urlRepository: UrlRepository, private profileRepository: ProfileRepository) {

    }

    public create(name: string, shortUrl: string, url: string, key: string): Promise<Url> {
        const self = this;
        return co(function* () {

            const format = new RegExp(/^([a-z]|-)+$/);
            if (!format.test(shortUrl)) {
                throw new Error('ShortUrl invalid format.');
            }

            const existingUrl = yield self.urlRepository.find(shortUrl);

            if (existingUrl) {
                throw new Error('ShortUrl already exist.');
            }

            const profile: Profile = yield self.profileRepository.find(key);

            if (!profile) {
                throw new Error('Profile does not exist.');
            }

            const result = new Url(name, shortUrl, url, []);

            yield self.urlRepository.insert(result, key);

            return result;
        });
    }

    public get(shortUrl: string): Promise<Url> {
        const self = this;
        return co(function* () {
            const url = yield self.urlRepository.find(shortUrl);
            return url;
        });
    }

    public getWithClick(shortUrl: string, referer: string, userAgent: string, acceptLanguage: string): Promise<Url> {
        const self = this;
        return co(function* () {
            const url: Url = yield self.urlRepository.find(shortUrl);
            url.clicks.push(new Click(null, referer, userAgent, acceptLanguage));

            yield self.urlRepository.update(url);
            return url;
        });
    }
}