// Imports
import { BaseRepository } from './base';

// Imports models
import { Url } from './../../entities/url';
import { Click } from './../../models/click';

export class UrlRepository extends BaseRepository {

    constructor(host: string, username: string, password: string) {
        super(host, username, password);
    }

    public async insert(url: Url, key: string): Promise<boolean> {
        await BaseRepository.sequelize.authenticate();

        const profile: any = await BaseRepository.models.Profile.find({
            where: {
                key,
            },
        });

        await BaseRepository.models.Url.create({
            name: url.name,
            profileId: profile.id,
            shortUrl: url.shortUrl,
            url: url.url,
        });

        return true;
    }

    public async update(url: Url): Promise<boolean> {
        await BaseRepository.sequelize.authenticate();

        const existingUrl: any = await BaseRepository.models.Url.find({
            include: [
                { model: BaseRepository.models.Click, required: false },
            ],
            where: {
                shortUrl: url.shortUrl,
            },
        });

        for (const click of url.clicks) {
            if (existingUrl.clicks.filter((x) => x.id === click.id).length > 0) {
                continue;
            }

            await BaseRepository.models.Click.create({
                acceptLanguage: click.acceptLanguage,
                referer: click.referer,
                urlId: existingUrl.id,
                userAgent: click.userAgent,
            });
        }

        return true;
    }

    public async find(shortUrl: string): Promise<Url> {
        const url: any = await BaseRepository.models.Url.find({
            include: [
                { model: BaseRepository.models.Click, required: false },
            ],
            where: {
                shortUrl,
            },
        });

        if (!url) {
            return null;
        }

        return new Url(url.name, url.shortUrl, url.url, url.clicks.map((x) => new Click(x.id, x.referer, x.userAgent, x.acceptLanguage)));
    }
}
