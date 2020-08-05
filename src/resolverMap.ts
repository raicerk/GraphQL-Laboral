import { IResolvers } from 'graphql-tools';
import { MongoClient, Db } from 'mongodb';

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
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