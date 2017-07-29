// Imports
import * as co from 'co';

// Imports models
import { Profile } from './../entities/profile';

// Imports interfaces
import { IProfileRepository } from './../repositories/profile';

export class ProfileService {
    constructor(private profileRepository: IProfileRepository) {

    }

    public get(key: string): Promise<Profile> {
        const self = this;
        return co(function* () {
            if (!key) {
                throw new Error('Key required.');
            }

            const profile = yield self.profileRepository.find(key);

            return profile;
        });
    }

    public create(name: string): Promise<Profile> {
        const self = this;
        return co(function* () {

            if (!name) {
                throw new Error('Name required.');
            }

            const profile = new Profile(name, self.generateKey());

            yield self.profileRepository.insert(profile);

            return profile;
        });
    }

    private generateKey() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 8; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }
}
