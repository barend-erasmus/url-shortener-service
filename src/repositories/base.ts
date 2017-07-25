// Imports
import * as Sequelize from 'sequelize';

export class BaseRepository {
    protected sequelize: Sequelize.Sequelize = null;
    protected models: { Profile: Sequelize.Model<{}, {}>, Url: Sequelize.Model<{}, {}> } = null;

    constructor(private host: string, private username: string, private password: string) {
        this.sequelize = new Sequelize('url-shortener-db', username, password, {
            host: host,
            dialect: 'postgres',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        });

        this.defineModels();
    }

    public sync(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.sequelize.sync({ force: true }).then(() => {
                resolve();
            });
        });
    }

    public close(): void {
        this.sequelize.close();
    }

    private defineModels(): void {
        const Profile = this.sequelize.define('profile', {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            key: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });

        const Url = this.sequelize.define('url', {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            shortUrl: {
                type: Sequelize.STRING,
                allowNull: false
            },
            url: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });

        Profile.hasMany(Url);

        this.models = {
            Profile: Profile,
            Url: Url
        };
    }
}