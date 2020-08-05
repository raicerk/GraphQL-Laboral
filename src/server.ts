import { ApolloServer } from 'apollo-server';

import schema from "./schema";

const server = new ApolloServer({
  schema,
});

server.listen(3000).then(({ url }) => console.log(`Server running at ${url} `));
