// Imports
import { BaseRepository } from './base';

// Imports models
import { Url } from './../../entities/url';
import { Click } from './../../models/click';

export class UrlRepository extends BaseRepository {

    constructor() {
        super();
    }

    public async insert(url: Url, key: string): Promise<boolean> {
        BaseRepository.collections.urls.push({
            clicks: url.clicks,
            id: BaseRepository.collections.urls.length + 1,
            key,
            name: url.name,
            shortUrl: url.shortUrl,
            url: url.url,
        });

        return true;
    }

    public async update(url: Url): Promise<boolean> {
        const existingUrl = BaseRepository.collections.urls.find((x) => x.shortUrl === url.shortUrl);

        existingUrl.clicks = url.clicks;

        return true;
    }

    public async find(shortUrl: string): Promise<Url> {
        const url = BaseRepository.collections.urls.find((x) => x.shortUrl === shortUrl);

        if (!url) {
            return null;
        }

        return new Url(url.name, url.shortUrl, url.url, url.clicks);
    }
}
