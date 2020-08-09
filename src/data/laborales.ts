import { db } from "./client";

import { Filtros } from "../interfaces/filtros";
import { Laboral } from "../interfaces/laboral";

export const Laborales = async (): Promise<string[]> => {
  return await db
    .collection("laboral")
    .find({ fecha: { $gt: "2018-12-01T00:00:00" } })
    .toArray();
};

export const LaboralesAgrupadosPorMes = async (where: Filtros): Promise<Laboral[]> => {
  return await db
    .collection("laboral")
    .find({ [where.field]: where.value, fecha: { $gt: "2018-12-01T00:00:00" } })
    .toArray();
};
