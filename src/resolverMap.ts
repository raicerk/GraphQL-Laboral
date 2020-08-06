import { IResolvers } from 'graphql-tools';
import outliers from 'outliers';

import { db } from './client';

const resolverMap: IResolvers = {
    Query: {
        hello: (): string => {
            return `👋 Hello world! 👋`;
        },
        my_query: async (): Promise<string[]> => {
            return db.collection('counters').find().toArray();
        },
        estadisticas: (): number[] => {
            return [2,3,4,5,6,7,1,2,3,2,1,4,6,0,1222].filter(outliers());
        }
    }
};

export default resolverMap;