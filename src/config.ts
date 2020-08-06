import * as dotenv from 'dotenv';
dotenv.config();

export const mongo = {
    PROTOCOL: process.env.MONGOPROTOCOL || 'mongodv+srv',
    PORT: process.env.MONGOPORT || 27017,
    HOST: process.env.MONGOHOST || 'localhost',
    NAMEDB: process.env.MONGONAMEDB || 'users',
    USER: process.env.MONGOUSER || '',
    PASSWORD: process.env.MONGOPASSWORD || ''
};
