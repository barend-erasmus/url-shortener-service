// Imports Repositories
import { ProfileRepository } from './../repositories/sequelize/profile';
import { UrlRepository } from './../repositories/sequelize/url';

import { ProfileRepository as MemoryProfileRepository} from './../repositories/memory/profile';
import { UrlRepository as MemoryUrlRepository } from './../repositories/memory/url';

// Imports services
import { ProfileService } from './../services/profile';
import { UrlService } from './../services/url';

export class BaseRouter {

    private static host = 'developersworkspace.co.za';
    private static username = 'url-shortener-service';
    private static password = '3evS*E6sBj&!S#u_';

    public static profileService(): ProfileService {
        // const profileRepository: ProfileRepository = new ProfileRepository(BaseRouter.host, BaseRouter.username, BaseRouter.password);
        const profileRepository: MemoryProfileRepository = new MemoryProfileRepository();
        return new ProfileService(profileRepository);
    }

    public static urlService(): UrlService {
        // const urlRepository: UrlRepository = new UrlRepository(BaseRouter.host, BaseRouter.username, BaseRouter.password);
        // const profileRepository: ProfileRepository = new ProfileRepository(BaseRouter.host, BaseRouter.username, BaseRouter.password);

        const urlRepository: MemoryUrlRepository = new MemoryUrlRepository();
        const profileRepository: MemoryProfileRepository = new MemoryProfileRepository();
        return new UrlService(urlRepository, profileRepository);
    }
}
