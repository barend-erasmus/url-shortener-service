// Import models
import { Click } from './../models/click';

export class Url {
    constructor(public name: string, public shortUrl: string, public url: string, public clicks: Click[]) {

    }
}