// Imports
import { assert, expect } from 'chai';
import 'co-mocha';
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
        profileService = new ProfileService(profileRepository);
    });

    it('should throw error given name null', function* () {

        try {
            const profile: Profile = yield profileService.create(null);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Name required.');
        }
    });

    it('should return profile', function* () {

        const profile: Profile = yield profileService.create('name1');

        expect(profile).to.be.not.null;
    });

    it('should return profile with key', function* () {

        const profile: Profile = yield profileService.create('name1');

        expect(profile.key).to.be.not.null;
    });

    it('should return profile with name', function* () {

        const profile: Profile = yield profileService.create('name1');

        expect(profile.name).to.be.not.null;
    });
});

describe('ProfileService.get', () => {
    let profileRepository: ProfileRepository;
    let profileService: ProfileService;

    beforeEach(() => {
        profileRepository = new ProfileRepository();
        profileService = new ProfileService(profileRepository);
    });

    it('should throw error given key null', function* () {

        try {
            const profile: Profile = yield profileService.get(null);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Key required.');
        }
    });

    it('should return null given non existing key', function* () {

        const profile: Profile = yield profileService.get('non-existing-key');

        expect(profile).to.be.null;
    });

    it('should return profile given existing key', function* () {

        const existingProfile: Profile = yield profileService.create('name1');
        const profile: Profile = yield profileService.get(existingProfile.key);

        expect(profile).to.be.not.null;
    });
});
