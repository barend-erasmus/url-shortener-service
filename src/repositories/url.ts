// Imports
import * as co from 'co';
import { BaseRepository } from './base';

// Imports models
import { Url } from './../entities/url';
import { Click } from './../models/click';

export class UrlRepository extends BaseRepository {

    constructor(host: string, username: string, password: string) {
        super(host, username, password);
    }

    public insert(url: Url, key: string): Promise<boolean> {
        const self = this;
        return co(function* () {
            yield BaseRepository.sequelize.authenticate();

            const profile = yield BaseRepository.models.Profile.find({
                where: {
                    key: key
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

    public update(url: Url): Promise<boolean> {
        const self = this;
        return co(function* () {
            yield BaseRepository.sequelize.authenticate();

            const existingUrl = yield BaseRepository.models.Url.find({
                where: {
                    shortUrl: url.shortUrl
                },
                include: [
                    { model: BaseRepository.models.Click, required: false }
                ]
            });

            if (!existingUrl) {
                throw new Error('Url does not exist.');
            }

            for (const click of url.clicks) {
                if (existingUrl.clicks.filter((x) => x.id === click.id).length > 0) {
                    continue;
                }

                yield BaseRepository.models.Click.create({
                    referer: click.referer,
                    userAgent: click.userAgent,
                    acceptLanguage: click.acceptLanguage,
                    urlId: existingUrl.id
                });
            }

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
                    { model: BaseRepository.models.Click, required: false }
                ]
            });

            if (!url) {
                return null;
            }

            return new Url(url.name, url.shortUrl, url.url, url.clicks.map((x) => new Click(x.id, x.referer, x.userAgent, x.acceptLanguage)));
        });
    }
}