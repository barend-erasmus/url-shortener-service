import * as co from 'co';
import { ProfileRepository } from './repositories/profile';
import { ProfileService } from './services/profile';

co(function* () {

  const host = 'developersworkspace.co.za';
  const username = 'url-shortener-service';
  const password = '3evS*E6sBj&!S#u_';

  const profileRepository = new ProfileRepository(host, username, password);
  const profileService = new ProfileService(profileRepository);

  yield profileRepository.sync();

  yield profileService.create('Barend-Test-1');

  profileRepository.close();
})




