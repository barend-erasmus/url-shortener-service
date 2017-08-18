// Imports models
import { Profile } from './../entities/profile';

// Imports interfaces
import { IProfileRepository } from './../repositories/profile';

export class ProfileService {
    constructor(private profileRepository: IProfileRepository) {

    }

    public async get(key: string): Promise<Profile> {
        if (!key) {
            throw new Error('Key required.');
        }

        const profile = await this.profileRepository.find(key);

        return profile;
    }

    public async create(name: string): Promise<Profile> {

        if (!name) {
            throw new Error('Name required.');
        }

        const profile = new Profile(name, this.generateKey());

        await this.profileRepository.insert(profile);

        return profile;
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
