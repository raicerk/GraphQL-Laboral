import { MongoClient, Db } from 'mongodb';

import { mongo } from './config';

const client = new MongoClient(`${mongo.PROTOCOL}://${mongo.USER}:${mongo.PASSWORD}@${mongo.HOST}/${mongo.NAMEDB}`, { useNewUrlParser: true, useUnifiedTopology: true });

export let db: Db;

client.connect((err: Error) => {
    console.log("MONGOdb connected");
    db = client.db(mongo.NAMEDB);
    if (err) {
        console.log(err);
    }
});






// const uri = "mongodb+srv://raicerk:<password>@laboral-k4r2w.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";

