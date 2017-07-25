// Imports
import * as co from 'co';
import { BaseRepository } from './base';

// Imports models
import { Url } from './../entities/url';

export class UrlRepository extends BaseRepository {

    constructor(host: string, username: string, password: string) {
        super(host, username, password);
    }

    public insert(url: Url): Promise<Url> {
        const self = this;
        return co(function* () {
            yield self.sequelize.authenticate();

            const profile = yield self.models.Profile.find({
                where: {
                    key: url.profile.key
                }
            });

            if (!profile) {
                throw new Error();
            }

            yield self.models.Url.create({
                name: url.name,
                shortUrl: url.shortUrl,
                url: url.url,
                profileId: profile.id
            });

            return true;
        });
    }
}