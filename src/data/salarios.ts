import { Tedis } from 'tedis';

import { db } from "./client";

import { port_redis } from "../config";
import { Filtros } from "../interfaces/filtros";
import { SalariosPorSkill } from "../interfaces/salarios";

const redis_client = new Tedis({
  port: parseInt(port_redis)
});

export const dataPorSkill = async (where: Filtros): Promise<SalariosPorSkill[]> => {
  const id = `${where.field}_${where.value}`;
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

  let datos: SalariosPorSkill[] = [];
  const data = await redis_client.get(id);

  if (data != null) {
    datos = JSON.parse(data.toString());
  } else {
    datos = await db.collection("laboral").aggregate(Agregatesalario).toArray();
    redis_client.setex(id, 5, JSON.stringify(datos));
  }

  return datos;
};
