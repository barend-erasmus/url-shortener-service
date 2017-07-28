// Imports
import * as co from 'co';

// Imports models
import { Profile } from './../entities/profile';

// Imports repositories
import { ProfileRepository } from './../repositories/profile';

export class ProfileService {
    constructor(private profileRepository: ProfileRepository) {

    }

    public get(key: string): Promise<Profile> {
        const self = this;
        return co(function* () {
            const profile = yield self.profileRepository.find(key);
            return profile;
        });
    }

    public create(name: string): Promise<Profile> {
        const self = this;
        return co(function* () {
            const profile = new Profile(name, self.generateKey(), []);

            yield self.profileRepository.insert(profile);

            return profile;
        });
    }

    private generateKey() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 8; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}