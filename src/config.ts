import * as dotenv from 'dotenv';
dotenv.config();

export const mongo = {
    PROTOCOL: process.env.MONGOPROTOCOL || 'mongodv+srv',
    PORT: process.env.MONGOPORT || 27017,
    HOST: process.env.MONGOHOST || 'localhost'
};
