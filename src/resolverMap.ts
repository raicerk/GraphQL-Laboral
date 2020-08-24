import { IResolvers } from "graphql-tools";

import { Salarios } from "./interfaces/salarios";
import { Filtros, Country, Skill } from "./interfaces/filtros";
import { Orden } from "./interfaces/ordenar";
import { Laborales } from "./data/laborales";
import { interSalarios } from "./interactors/salarios";
import { interLaboralesAgrupadosPorMes, interLaboralesAcumulados, interLaboral, interLaboralConOtrosSkill } from "./interactors/laboral";
import { SkillAgrupados, SkillAcumulados, Laboral } from "./interfaces/laboral";

const resolverMap: IResolvers = {
  Query: {
    hello: (): string => {
      return `👋 Hello mundo! 👋`;
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
    LaboralConOtrosSkill: async (
      root: string,
      args: { country: Country; skill: Skill }
    ): Promise<SkillAcumulados[]> => {
      return await interLaboralConOtrosSkill(args.country, args.skill);
    },
  },
};

export default resolverMap;
