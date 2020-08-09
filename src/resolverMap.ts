import { IResolvers } from "graphql-tools";

import { Salarios } from "./interfaces/salarios";
import { Filtros } from "./interfaces/filtros";
import { Laborales } from "./data/laborales";
import { interSalarios } from "./interactors/salarios";
import { interLaboralesAgrupadosPorMes } from "./interactors/laboral";
import { SkillAgrupados } from "./interfaces/laboral";

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
    LaboralAgrupadoPorMes: async (
      root: string,
      args: { where: Filtros }
    ): Promise<SkillAgrupados[]> => {
      return await interLaboralesAgrupadosPorMes(args.where);
    },
  },
};

export default resolverMap;
