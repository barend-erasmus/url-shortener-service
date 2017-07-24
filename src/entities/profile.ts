// Imports models
import { Url } from './../models/url';

export class Profile {
    constructor(public name: string, public key: string, public urls: Url[]) {

    }
}