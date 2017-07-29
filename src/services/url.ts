// Imports
import * as co from 'co';

// Imports models
import { Profile } from './../entities/profile';
import { Url } from './../entities/url';
import { Click } from './../models/click';

// Imports interfaces
import { IProfileRepository } from './../repositories/profile';
import { IUrlRepository } from './../repositories/url';

export class UrlService {

    constructor(private urlRepository: IUrlRepository, private profileRepository: IProfileRepository) {

    }

    public create(name: string, shortUrl: string, url: string, key: string): Promise<Url> {
        const self = this;
        return co(function*() {

            if (!name) {
                throw new Error('Name required.');
            }

            if (!shortUrl) {
                throw new Error('Short Url required.');
            }

            if (!url) {
                throw new Error('Url required.');
            }

            if (!key) {
                throw new Error('Key required.');
            }

            const format = new RegExp(/^([a-z]|[A-Z]|[0-9]|-)+$/);
            if (!format.test(shortUrl)) {
                throw new Error('Short Url invalid format.');
            }

            const existingUrl = yield self.urlRepository.find(shortUrl);

            if (existingUrl) {
                throw new Error('Short Url already exist.');
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
        return co(function*() {

            if (!shortUrl) {
                throw new Error('Short Url required.');
            }

            const url = yield self.urlRepository.find(shortUrl);
            return url;
        });
    }

    public getWithClick(shortUrl: string, referer: string, userAgent: string, acceptLanguage: string): Promise<Url> {
        const self = this;
        return co(function*() {

            if (!shortUrl) {
                throw new Error('Short Url required.');
            }

            const url: Url = yield self.urlRepository.find(shortUrl);
            url.clicks.push(new Click(null, referer, userAgent, acceptLanguage));

            yield self.urlRepository.update(url);
            return url;
        });
    }
}
