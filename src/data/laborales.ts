import { db } from "./client";

import { Filtros, Country, Skill } from "../interfaces/filtros";
import { Laboral, otrosSkill } from "../interfaces/laboral";
import { Orden } from "../interfaces/ordenar";

export const Laborales = async (): Promise<string[]> => {
  return await db
    .collection("laboral")
    .find({ fecha: { $gt: "2018-12-01T00:00:00" } })
    .toArray();
};

export const LaboralesConFiltro = async (where: Filtros): Promise<Laboral[]> => {
  return await db
    .collection("laboral")
    .find({ [where.field]: where.value, fecha: { $gt: "2018-12-01T00:00:00" } })
    .toArray();
};

export const LaboralesConFiltroYorden = async (where: Filtros, order: Orden): Promise<Laboral[]> => {
  return await db
    .collection("laboral")
    .find({ [where.field]: where.value, fecha: { $gt: "2018-12-01T00:00:00" } })
    .sort({ [order.by]: order.orientation == "ASC" ? 1 : -1 })
    .toArray();
};


export const LaboralConOtrosSkill = async (country: Country, skill: Skill): Promise<otrosSkill[]> => {
  const AgregateConOtrosSkill = [
    {
      '$match': {
        skill: skill.value,
        pais: country.value,
        fecha: { $gt: "2018-12-01T00:00:00" }
      }
    }, {
      '$unwind': {
        'path': '$skill'
      }
    }, {
      '$group': {
        '_id': '$skill',
        'count': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        'count': -1
      }
    }
  ];

  return await db
    .collection("laboral")
    .aggregate(AgregateConOtrosSkill)
    .toArray();
};
