// Imports
import { BaseRepository } from './base';

// Imports models
import { Profile } from './../../entities/profile';

export class ProfileRepository extends BaseRepository {

    constructor() {
        super();
    }

    public async insert(profile: Profile): Promise<boolean> {
        BaseRepository.collections.profiles.push({
            key: profile.key,
            name: profile.name,
        });

        return true;
    }

    public async find(key: string): Promise<Profile> {
        const profile = BaseRepository.collections.profiles.find((x) => x.key === key);

        if (!profile) {
            return null;
        }

        return new Profile(profile.name, profile.key);
    }
}
