// Imports
import { assert, expect } from 'chai';
import 'mocha';

// Imports repositories
import { ProfileRepository } from './../repositories/memory/profile';

// Imports services
import { ProfileService } from './../services/profile';

// Imports models
import { Profile } from './../entities/profile';

describe('ProfileService.create', () => {
    let profileRepository: ProfileRepository;
    let profileService: ProfileService;

    beforeEach(() => {
        profileRepository = new ProfileRepository();

        profileRepository.drop();
        
        profileService = new ProfileService(profileRepository);
    });

    it('should throw error given name null', async () => {

        try {
            const profile: Profile = await profileService.create(null);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Name required.');
        }
    });

    it('should return profile', async () => {

        const profile: Profile = await profileService.create('name1');

        expect(profile).to.be.not.null;
    });

    it('should return profile with key', async () => {

        const profile: Profile = await profileService.create('name1');

        expect(profile.key).to.be.not.null;
    });

    it('should return profile with name', async () => {

        const profile: Profile = await profileService.create('name1');

        expect(profile.name).to.be.not.null;
    });
});

describe('ProfileService.get', () => {
    let profileRepository: ProfileRepository;
    let profileService: ProfileService;

    beforeEach(() => {
        profileRepository = new ProfileRepository();

        profileRepository.drop();

        profileService = new ProfileService(profileRepository);
    });

    it('should throw error given key null', async () => {

        try {
            const profile: Profile = await profileService.get(null);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Key required.');
        }
    });

    it('should return null given non existing key', async () => {

        const profile: Profile = await profileService.get('non-existing-key');

        expect(profile).to.be.null;
    });

    it('should return profile given existing key', async () => {

        const existingProfile: Profile = await profileService.create('name1');
        const profile: Profile = await profileService.get(existingProfile.key);

        expect(profile).to.be.not.null;
    });
});
