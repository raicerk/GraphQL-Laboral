import { IResolvers } from "graphql-tools";

import { Salarios } from "./interfaces/salarios";
import { Filtros } from "./interfaces/filtros";
import { Laborales } from "./data/laborales";
import { interSalarios } from "./interactors/salarios";

const resolverMap: IResolvers = {
  Query: {
    hello: (): string => {
      return `👋 Hello world! 👋`;
    },
    Laborales: async (): Promise<string[]> => {
      return await Laborales();
    },
    LaboralSalarios: async (
      root: string,
      args: { where: Filtros }
    ): Promise<Salarios[]> => {
      return await interSalarios(args.where);
    },
  },
};

export default resolverMap;
