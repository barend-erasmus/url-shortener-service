
export class BaseRepository {
    protected static collections: { profiles: any[], urls: any[] };

    constructor() {
        if (!BaseRepository.collections) {
            BaseRepository.collections = {
                profiles: [],
                urls: [],
            };
        }
    }

    public drop(): void {
        BaseRepository.collections = {
            profiles: [],
            urls: [],
        };
    }
}
