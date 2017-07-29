// Imports
import * as co from 'co';
import { BaseRepository } from './base';

// Imports models
import { Profile } from './../../entities/profile';

export class ProfileRepository extends BaseRepository {

    constructor() {
        super();
    }

    public insert(profile: Profile): Promise<boolean> {
        const self = this;
        return co(function*() {

            BaseRepository.collections.profiles.push({
                key: profile.key,
                name: profile.name,
            });

            return true;
        });
    }

    public find(key: string): Promise<Profile> {
        const self = this;
        return co(function*() {

            const profile = BaseRepository.collections.profiles.find((x) => x.key === key);

            if (!profile) {
                return null;
            }

            return new Profile(profile.name, profile.key);
        });
    }
}
