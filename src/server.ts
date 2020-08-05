import { ApolloServer, gql } from 'apollo-server';
import { MongoClient, Db } from 'mongodb';


const url = 'mongodb://localhost:27017';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
let db: Db;
client.connect((err:Error) => {
    console.log("MONGOdb connected");
    db = client.db("users");
});

const typeDefs = gql`
type Query {
  my_query:[counters]
  hello: String
}
type counters{
_id:String,
seq:String
}`

const resolvers = {
    Query: {
        hello: () => {
            return `hey sup ? `;
        },
        my_query: async () => {
            let values = await db.collection('counters').find().toArray().then((res:any) => { return res });
            return values
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen(3000).then(({ url }) => console.log(`Server running at ${url} `));