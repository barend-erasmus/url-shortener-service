// Imports models
import { Profile } from './../entities/profile';

export interface IProfileRepository {

    insert(profile: Profile): Promise<boolean>;
    find(key: string): Promise<Profile>;
}