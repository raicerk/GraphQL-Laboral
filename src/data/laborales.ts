import { db } from "./client";

export const Laborales = async (): Promise<string[]> => {
  return await db
    .collection("laboral")
    .find({ fecha: { $gt: "2018-12-01T00:00:00" } })
    .toArray();
};
