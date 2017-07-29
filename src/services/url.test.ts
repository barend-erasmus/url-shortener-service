// Imports
import { assert, expect } from 'chai';
import 'co-mocha';
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

    it('should throw error given name null', function* () {

        try {
            const profile: Profile = yield profileService.create('name1');
            const url: Url = yield urlService.create(null, 'shortUrl1', 'url1', profile.key);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Name required.');
        }
    });

    it('should throw error given shortUrl null', function* () {

        try {
            const profile: Profile = yield profileService.create('name1');
            const url: Url = yield urlService.create('name', null, 'url1', profile.key);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Short Url required.');
        }
    });

    it('should throw error given url null', function* () {

        try {
            const profile: Profile = yield profileService.create('name1');
            const url: Url = yield urlService.create('name', 'shortUrl1', null, profile.key);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Url required.');
        }
    });

    it('should throw error given key null', function* () {

        try {
            const url: Url = yield urlService.create('name', 'shortUrl1', 'url1', null);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Key required.');
        }
    });

    it('should throw error given invalid shortUrl', function* () {

        try {
            const profile: Profile = yield profileService.create('name1');
            const url: Url = yield urlService.create('name', '$$$', 'url1', profile.key);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Short Url invalid format.');
        }
    });

    it('should throw error given existing shortUrl', function* () {

        try {
            const profile: Profile = yield profileService.create('name1');
            yield urlService.create('name', 'shortUrl1', 'url1', profile.key);
            const url: Url = yield urlService.create('name', 'shortUrl1', 'url1', profile.key);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Short Url already exist.');
        }
    });

    it('should throw error given non existing key', function* () {

        try {
            const url: Url = yield urlService.create('name', 'shortUrl1', 'url1', 'non-existing-key');

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Profile does not exist.');
        }
    });

    it('should return url', function* () {
        const profile: Profile = yield profileService.create('name1');
        const url: Url = yield urlService.create('name1', 'shortUrl1', 'url1', profile.key);

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

    it('should throw error given shortUrl null', function* () {

        try {
            const url: Url = yield urlService.get(null);

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Short Url required.');
        }
    });

    it('should return null given non existing shortUrl', function* () {

        const url: Url = yield urlService.get('non-existing-short-url');

        expect(url).to.be.null;
    });

    it('should return url given existing shortUrl', function* () {

        const profile: Profile = yield profileService.create('name1');
        yield urlService.create('name1', 'shortUrl1', 'url1', profile.key);

        const url: Url = yield urlService.get('shortUrl1');

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

    it('should throw error given shortUrl null', function* () {

        try {
            const url: Url = yield urlService.getWithClick(null, 'referer1', 'userAgent1', 'acceptLanguage1');

            throw new Error('Expected Error');
        } catch (err) {
            expect(err.message).to.be.eq('Short Url required.');
        }
    });

    it('should return null given non existing shortUrl', function* () {

        const url: Url = yield urlService.getWithClick('non-existing-short-url', 'referer1', 'userAgent1', 'acceptLanguage1');

        expect(url).to.be.null;
    });

    it('should return url given existing shortUrl', function* () {

        const profile: Profile = yield profileService.create('name1');
        yield urlService.create('name1', 'shortUrl1', 'url1', profile.key);

        const url: Url = yield urlService.getWithClick('shortUrl1', 'referer1', 'userAgent1', 'acceptLanguage1');

        expect(url).to.be.not.null;
    });
});

