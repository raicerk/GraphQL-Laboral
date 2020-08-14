import { db } from "./client";

import { Filtros } from "../interfaces/filtros";
import { Laboral } from "../interfaces/laboral";
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
