import { IResolvers } from "graphql-tools";

import { Salarios } from "./interfaces/salarios";
import { Filtros } from "./interfaces/filtros";
import { Orden } from "./interfaces/ordenar";
import { Laborales } from "./data/laborales";
import { interSalarios } from "./interactors/salarios";
import { interLaboralesAgrupadosPorMes, interLaboralesAcumulados, interLaboral } from "./interactors/laboral";
import { SkillAgrupados, SkillAcumulados, Laboral } from "./interfaces/laboral";

const resolverMap: IResolvers = {
  Query: {
    hello: (): string => {
      return `👋 Hello world! 👋`;
    },
    Laboral: async (
      root: string,
      args: { where: Filtros; order: Orden }
    ): Promise<Laboral[]> => {
      return await interLaboral(args.where, args.order);
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
    LaboralAcumulado: async (
      root: string,
      args: { where: Filtros }
    ): Promise<SkillAcumulados[]> => {
      return await interLaboralesAcumulados(args.where);
    },
  },
};

export default resolverMap;
