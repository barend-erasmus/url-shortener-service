// Imports
import * as co from 'co';
import { BaseRepository } from './base';

// Imports models
import { Profile } from './../entities/profile';
import { Url } from './../models/url';

export class ProfileRepository extends BaseRepository {

    constructor(host: string, username: string, password: string) {
        super(host, username, password);
    }

    public insert(profile: Profile): Promise<Profile> {
        const self = this;
        return co(function* () {
            yield self.sequelize.authenticate();

            yield self.models.Profile.create({
                name: profile.name,
                key: profile.key
            });

            return true;
        });
    }

    public find(key: string): Promise<Profile> {
        const self = this;

        return co(function* () {

            const profile = yield self.models.Profile.find({
                where: {
                    key: key
                },
                include: [
                    { model: self.models.Url, required: true }
                ]
            });

            return new Profile(profile.name, profile.key, profile.urls.map((x) => new Url(x.name, x.shortUrl, x.url)));
        });
    }
}