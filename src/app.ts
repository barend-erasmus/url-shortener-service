import * as co from 'co';
import { ProfileRepository } from './repositories/profile';
import { UrlRepository } from './repositories/url';
import { ProfileService } from './services/profile';

import { Url } from './entities/url';
import { Profile } from './models/profile';

co(function* () {

  const host = 'developersworkspace.co.za';
  const username = 'url-shortener-service';
  const password = '3evS*E6sBj&!S#u_';

  const profileRepository = new ProfileRepository(host, username, password);
  const urlRepository = new UrlRepository(host, username, password);
  const profileService = new ProfileService(profileRepository);

  const a = yield profileRepository.find('yVSs6FhJ');
  console.log(a);
  profileRepository.close();
})




