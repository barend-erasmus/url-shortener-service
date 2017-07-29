
export class BaseRepository {
    public static collections: { profiles: any[], urls: any[] };

    constructor() {
        if (!BaseRepository.collections) {
            BaseRepository.collections = {
                profiles: [],
                urls: [],
            };
        }
    }
}
