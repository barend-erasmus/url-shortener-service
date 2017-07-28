// Imports
import * as co from 'co';
import { BaseRepository } from './base';

// Imports models
import { Profile } from './../entities/profile';

export class ProfileRepository extends BaseRepository {

    constructor(host: string, username: string, password: string) {
        super(host, username, password);
    }

    public insert(profile: Profile): Promise<Profile> {
        const self = this;
        return co(function* () {
            yield BaseRepository.sequelize.authenticate();

            yield BaseRepository.models.Profile.create({
                name: profile.name,
                key: profile.key
            });

            return true;
        });
    }

    public find(key: string): Promise<Profile> {
        const self = this;

        return co(function* () {

            const profile = yield BaseRepository.models.Profile.find({
                where: {
                    key: key
                }
            });
            
            if (!profile) {
                return null;
            }

            return new Profile(profile.name, profile.key);
        });
    }
}