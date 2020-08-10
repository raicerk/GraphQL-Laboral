import { MongoClient, Db } from 'mongodb';

import { mongo } from '../config';

const client = new MongoClient(`${mongo.PROTOCOL}://${mongo.USER}:${mongo.PASSWORD}@${mongo.HOST}/${mongo.NAMEDB}`, { useNewUrlParser: true, useUnifiedTopology: true });

export let db: Db;

client.connect((err: Error) => {
    db = client.db(mongo.NAMEDB);
    err ? console.log(err.message) : console.log('Database mongo connected');
});
