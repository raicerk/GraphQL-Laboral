import * as dotenv from 'dotenv';
dotenv.config();

export default {
    MONGOPORT: process.env.MONGOPORT || 27017,
    MONGOHOST: process.env.MONGOHOST || 'localhost',
    MONGOPROTOCOL: process.env.MONGOPROTOCOL || 'mongodv+srv',
};