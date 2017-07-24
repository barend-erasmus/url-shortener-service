// Import models
import { Profile } from './../models/profile';

export class Url {
    constructor(public name: string, public shortUrl: string, public url: string, public profile: Profile) {

    }
}