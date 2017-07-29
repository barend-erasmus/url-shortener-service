// Imports
import * as Sequelize from 'sequelize';

export class BaseRepository {
    protected static sequelize: Sequelize.Sequelize = null;
    protected static models: { Profile: Sequelize.Model<{}, {}>, Url: Sequelize.Model<{}, {}>, Click: Sequelize.Model<{}, {}> } = null;

    constructor(private host: string, private username: string, private password: string) {

        if (!BaseRepository.sequelize) {
            BaseRepository.sequelize = new Sequelize('url-shortener-db', username, password, {
                host,
                dialect: 'postgres',
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000,
                },
            });

            BaseRepository.defineModels();
        }
    }

    public sync(): Promise<void> {
        return new Promise((resolve, reject) => {
            BaseRepository.sequelize.sync({ force: true }).then(() => {
                resolve();
            });
        });
    }

    public close(): void {
        BaseRepository.sequelize.close();
    }

    private static defineModels(): void {
        const Profile = BaseRepository.sequelize.define('profile', {
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            key: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });

        const Url = BaseRepository.sequelize.define('url', {
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            shortUrl: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            url: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });

        const Click = BaseRepository.sequelize.define('click', {
            referer: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userAgent: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            acceptLanguage: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });

        Profile.hasMany(Url);
        Url.belongsTo(Profile);

        Url.hasMany(Click);
        Click.belongsTo(Url);

        this.models = {
            Profile,
            Url,
            Click,
        };
    }
}
