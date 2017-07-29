// Imports
import * as co from 'co';
import { BaseRepository } from './base';

// Imports models
import { Url } from './../../entities/url';
import { Click } from './../../models/click';

export class UrlRepository extends BaseRepository {

    constructor() {
        super();
    }

    public insert(url: Url, key: string): Promise<boolean> {
        const self = this;
        return co(function* () {

            BaseRepository.collections.urls.push({
                id: BaseRepository.collections.urls.length + 1,
                name: url.name,
                shortUrl: url.shortUrl,
                url: url.url,
                clicks: url.clicks,
                key: key
            });

            return true;
        });
    }

    public update(url: Url): Promise<boolean> {
        const self = this;
        return co(function* () {
            const existingUrl = BaseRepository.collections.urls.find((x) => x.shortUrl === url.shortUrl);

            existingUrl.clicks = url.clicks;

            return true;
        });
    }

    public find(shortUrl: string): Promise<Url> {
        const self = this;
        return co(function* () {

            const url = BaseRepository.collections.urls.find((x) => x.shortUrl === shortUrl);

            if (!url) {
                return null;
            }

            return new Url(url.name, url.shortUrl, url.url, url.clicks);
        });
    }
}