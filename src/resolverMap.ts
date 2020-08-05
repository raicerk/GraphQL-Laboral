import { IResolvers } from 'graphql-tools';
import { MongoClient, Db } from 'mongodb';

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
let db: Db;
client.connect((err:Error) => {
    console.log("MONGOdb connected");
    db = client.db("users");
});
const resolverMap: IResolvers = {
    Query: {
        hello: () => {
            return `👋 Hello world! 👋`;
        },
        my_query: async () => {
            let values = await db.collection('counters').find().toArray().then((res:any) => { return res });
            return values
        }
    }
};
export default resolverMap;