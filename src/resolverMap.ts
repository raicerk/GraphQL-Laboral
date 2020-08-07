import { IResolvers } from "graphql-tools";
import outliers from "outliers";

import { db } from "./client";
import { Salarios, SalariosDetalle } from "./interfaces/salarios";
import { Filtros } from "./interfaces/filtros";

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
      return await db
        .collection("laboral")
        .find({ fecha: { $gt: "2018-12-01T00:00:00" } })
        .toArray();
    },
    LaboralSalarios: async (
      root: string,
      args: { where: Filtros }
    ): Promise<Salarios[]> => {
      const { field, value } = args.where;
      const Agregatesalario = [
        {
          $unwind: {
            path: "$skill",
          },
        },
        {
          $match: {
            [field]: value,
            fecha: { $gt: "2018-12-01T00:00:00" },
            $and: [
              {
                sueldominimo: {
                  $ne: null,
                },
              },
              {
                sueldominimo: {
                  $ne: "",
                },
              },
            ],
          },
        },
        {
          $group: {
            _id: "$skill",
            sueldominimo: {
              $push: "$sueldominimo",
            },
            sueldomaximo: {
              $push: "$sueldomaximo",
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ];

      const snapshot = await db
        .collection("laboral")
        .aggregate(Agregatesalario)
        .toArray();

      console.log(snapshot);

      return snapshot.map((iter: SalariosDetalle) => ({
        skill: iter._id,
        salariominimo: Math.round(iter.averageMin),
        salariomaximo: Math.round(iter.averageMax),
        media: Math.round(iter.media),
        cantidad: iter.count,
      }));
    },
  },
};

export default resolverMap;
