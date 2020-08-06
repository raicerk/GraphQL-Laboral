import { IResolvers } from 'graphql-tools';

import { db } from './client';

const resolverMap: IResolvers = {
    Query: {
        hello: (): string => {
            return `👋 Hello world! 👋`;
        },
        my_query: async (): Promise<string[]> => {
            return db.collection('counters').find().toArray();
        }
    }
};

export default resolverMap;