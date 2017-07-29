// Imports models
import { Url } from './../entities/url';

export interface IUrlRepository {

    insert(url: Url, key: string): Promise<boolean>;
    update(url: Url): Promise<boolean>;
    find(shortUrl: string): Promise<Url>;
}
