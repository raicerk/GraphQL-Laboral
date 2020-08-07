import { db } from "./client";

import { Filtros } from "../interfaces/filtros";
import { Temporal } from "../interfaces/salarios";

export const SalariosPorSkill = async (where: Filtros): Promise<Temporal[]> => {
  const Agregatesalario = [
    {
      $unwind: {
        path: "$skill",
      },
    },
    {
      $match: {
        [where.field]: where.value,
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

  return await db.collection("laboral").aggregate(Agregatesalario).toArray();
};
