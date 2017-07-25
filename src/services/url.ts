// Imports
import * as co from 'co';

// Imports models
import { Url } from './../entities/url';
import { Profile } from './../models/profile';

// Imports repositories
import { ProfileRepository } from './../repositories/profile';
import { UrlRepository } from './../repositories/url';

export class UrlService {

    constructor(private urlRepository: UrlRepository) {

    }

    public create(name: string, shortUrl: string, url: string, key: string): Promise<Url> {
        const self = this;
        return co(function* () {

            const result = new Url(name, shortUrl, url, new Profile(null, key));

            yield self.urlRepository.insert(result);

            return result;
        });
    }
}