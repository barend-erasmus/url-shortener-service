// Imports
import { assert, expect } from 'chai';
import 'mocha';

// Imports repositories
import { ProfileRepository } from './../repositories/memory/profile';
import { UrlRepository } from './../repositories/memory/url';

// Imports services
import { UrlService } from './../services/url';
import { ProfileService } from './../services/profile';

// Imports models
import { Profile } from './../entities/profile';
import { Url } from './../entities/url';

describe('UrlService.create', () => {
    let profileRepository: ProfileRepository;
    let urlRepository: UrlRepository;
    let urlService: UrlService;
    let profileService: ProfileService;

    beforeEach(() => {
        profileRepository = new ProfileRepository();
        urlRepository = new UrlRepository();
        
        profileRepository.drop();
        urlRepository.drop();

        urlService = new UrlService(urlRepository, profileRepository);
        profileService = new ProfileService(profileRepository);
    });

    it('should throw error given name null', async () => {

        try {
            const profile: Profile = await profileService.create('name1');
            const url: Url = await urlService.create(null, 'shortUrl1', 'url1', profile.key);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Name required.');
        }
    });

    it('should throw error given shortUrl null', async () => {

        try {
            const profile: Profile = await profileService.create('name1');
            const url: Url = await urlService.create('name', null, 'url1', profile.key);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Short Url required.');
        }
    });

    it('should throw error given url null', async () => {

        try {
            const profile: Profile = await profileService.create('name1');
            const url: Url = await urlService.create('name', 'shortUrl1', null, profile.key);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Url required.');
        }
    });

    it('should throw error given key null', async () => {

        try {
            const url: Url = await urlService.create('name', 'shortUrl1', 'url1', null);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Key required.');
        }
    });

    it('should throw error given invalid shortUrl', async () => {

        try {
            const profile: Profile = await profileService.create('name1');
            const url: Url = await urlService.create('name', '$$$', 'url1', profile.key);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Short Url invalid format.');
        }
    });

    it('should throw error given existing shortUrl', async () => {

        try {
            const profile: Profile = await profileService.create('name1');
            await urlService.create('name', 'shortUrl1', 'url1', profile.key);
            const url: Url = await urlService.create('name', 'shortUrl1', 'url1', profile.key);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Short Url already exist.');
        }
    });

    it('should throw error given non existing key', async () => {

        try {
            const url: Url = await urlService.create('name', 'shortUrl1', 'url1', 'non-existing-key');

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Profile does not exist.');
        }
    });

    it('should return url', async () => {
        const profile: Profile = await profileService.create('name1');
        const url: Url = await urlService.create('name1', 'shortUrl1', 'url1', profile.key);

        expect(url).to.be.not.null;
    });

});

describe('UrlService.get', () => {
    let profileRepository: ProfileRepository;
    let urlRepository: UrlRepository;
    let urlService: UrlService;
    let profileService: ProfileService;

    beforeEach(() => {
        profileRepository = new ProfileRepository();
        urlRepository = new UrlRepository();
        
        profileRepository.drop();
        urlRepository.drop();

        urlService = new UrlService(urlRepository, profileRepository);
        profileService = new ProfileService(profileRepository);
    });

    it('should throw error given shortUrl null', async () => {

        try {
            const url: Url = await urlService.get(null);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Short Url required.');
        }
    });

    it('should return null given non existing shortUrl', async () => {

        const url: Url = await urlService.get('non-existing-short-url');

        expect(url).to.be.null;
    });

    it('should return url given existing shortUrl', async () => {

        const profile: Profile = await profileService.create('name1');
        await urlService.create('name1', 'shortUrl1', 'url1', profile.key);

        const url: Url = await urlService.get('shortUrl1');

        expect(url).to.be.not.null;
    });
});

describe('UrlService.getWithClick', () => {
    let profileRepository: ProfileRepository;
    let urlRepository: UrlRepository;
    let urlService: UrlService;
    let profileService: ProfileService;

    beforeEach(() => {
        profileRepository = new ProfileRepository();
        urlRepository = new UrlRepository();
        
        profileRepository.drop();
        urlRepository.drop();

        urlService = new UrlService(urlRepository, profileRepository);
        profileService = new ProfileService(profileRepository);
    });

    it('should throw error given shortUrl null', async () => {

        try {
            const url: Url = await urlService.getWithClick(null, 'referer1', 'userAgent1', 'acceptLanguage1');

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Short Url required.');
        }
    });

    it('should return null given non existing shortUrl', async () => {

        const url: Url = await urlService.getWithClick('non-existing-short-url', 'referer1', 'userAgent1', 'acceptLanguage1');

        expect(url).to.be.null;
    });

    it('should return url given existing shortUrl', async () => {

        const profile: Profile = await profileService.create('name1');
        await urlService.create('name1', 'shortUrl1', 'url1', profile.key);

        const url: Url = await urlService.getWithClick('shortUrl1', 'referer1', 'userAgent1', 'acceptLanguage1');

        expect(url).to.be.not.null;
    });
});

