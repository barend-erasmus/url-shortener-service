// Imports
import { BaseRepository } from './base';

// Imports models
import { Profile } from './../../entities/profile';

export class ProfileRepository extends BaseRepository {

    constructor(host: string, username: string, password: string) {
        super(host, username, password);
    }

    public async insert(profile: Profile): Promise<boolean> {
        await BaseRepository.sequelize.authenticate();

        await BaseRepository.models.Profile.create({
            key: profile.key,
            name: profile.name,
        });

        return true;
    }

    public async find(key: string): Promise<Profile> {
        const profile: any = await BaseRepository.models.Profile.find({
            where: {
                key,
            },
        });

        if (!profile) {
            return null;
        }

        return new Profile(profile.name, profile.key);
    }
}
