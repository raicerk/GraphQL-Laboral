import { ApolloServer } from 'apollo-server';

import { port } from "./config";
import schema from "./schema";

const server = new ApolloServer({
  schema,
});

server.listen(port).then(({ url }) => console.log(`Server apollo connected and running at ${url} `));
