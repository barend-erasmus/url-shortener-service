// Import Repositories
import { BaseRepository } from './repositories/base';

// Imports services
import { ProfileService } from './services/profile';


const host = 'developersworkspace.co.za';
const username = 'url-shortener-service';
const password = '3evS*E6sBj&!S#u_';
const baseRepository: BaseRepository = new BaseRepository(host, username, password);

baseRepository.sync().then(() => {
    baseRepository.close();
});