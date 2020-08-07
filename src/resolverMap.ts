import { IResolvers } from "graphql-tools";
import outliers from "outliers";

import { Salarios, Temporal } from "./interfaces/salarios";
import { Filtros } from "./interfaces/filtros";
import { SalariosPorSkill } from "./data/sueldos";
import { avg } from "./helpers/math";
import { Laborales } from "./data/laborales";

const resolverMap: IResolvers = {
  Query: {
    hello: (): string => {
      return `👋 Hello world! 👋`;
    },
    estadisticas: (): number[] => {
      return [2, 3, 4, 5, 6, 7, 1, 2, 3, 2, 1, 4, 6, 0, 1222].filter(
        outliers()
      );
    },
    Laborales: async (): Promise<string[]> => {
      return await Laborales();
    },
    LaboralSalarios: async (
      root: string,
      args: { where: Filtros }
    ): Promise<Salarios[]> => {
      const snapshot = await SalariosPorSkill(args.where);

      return snapshot.map((iter: Temporal) => ({
        skill: iter._id,
        salariominimo: avg(iter.sueldominimo),
        salariomaximo: avg(iter.sueldomaximo),
        media: 1,
        cantidad: 1,
      }));
    },
  },
};

export default resolverMap;
