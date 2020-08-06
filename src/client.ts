import { MongoClient, Db } from 'mongodb';

import { mongo } from './config';

const client = new MongoClient(`${mongo.PROTOCOL}://${mongo.HOST}:${mongo.PORT}`, { useNewUrlParser: true, useUnifiedTopology: true });

export let db: Db;

client.connect((err: Error) => {
    console.log("MONGOdb connected");
    db = client.db("users");
    if (err) {
        console.log(err);
    }
});
