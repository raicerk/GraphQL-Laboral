import { IResolvers } from 'graphql-tools';
import { MongoClient, Db } from 'mongodb';
import config from './config';

const client = new MongoClient(`${config.MONGOPROTOCOL}://${config.MONGOHOST}:${config.MONGOPORT}`, { useNewUrlParser: true, useUnifiedTopology: true });
let db: Db;

client.connect((err: Error) => {
    console.log("MONGOdb connected");
    db = client.db("users");
    if(err){
        console.log(err);
    }
});

const resolverMap: IResolvers = {
    Query: {
        hello: (): string => {
            return `👋 Hello world! 👋`;
        },
        my_query: async (): Promise<string[]> => {
            return await db.collection('counters').find().toArray();
        }
    }
};
export default resolverMap;