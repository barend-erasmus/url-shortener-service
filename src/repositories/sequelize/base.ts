// Imports
import * as Sequelize from 'sequelize';

export class BaseRepository {
    protected static sequelize: Sequelize.Sequelize = null;
    protected static models: { Profile: Sequelize.Model<{}, {}>, Url: Sequelize.Model<{}, {}>, Click: Sequelize.Model<{}, {}> } = null;

    private static defineModels(): void {
        const Profile = BaseRepository.sequelize.define('profile', {
            key: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
        });

        const Url = BaseRepository.sequelize.define('url', {
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            shortUrl: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            url: {
                allowNull: false,
                type: Sequelize.STRING,
            },
        });

        const Click = BaseRepository.sequelize.define('click', {
            acceptLanguage: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            referer: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            userAgent: {
                allowNull: false,
                type: Sequelize.STRING,
            },
        });

        Profile.hasMany(Url);
        Url.belongsTo(Profile);

        Url.hasMany(Click);
        Click.belongsTo(Url);

        this.models = {
            Click,
            Profile,
            Url,
        };
    }

    constructor(private host: string, private username: string, private password: string) {

        if (!BaseRepository.sequelize) {
            BaseRepository.sequelize = new Sequelize('url-shortener-db', username, password, {
                dialect: 'postgres',
                host,
                pool: {
                    idle: 10000,
                    max: 5,
                    min: 0,
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

}
