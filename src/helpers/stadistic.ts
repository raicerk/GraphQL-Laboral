import outliers from "outliers";

export const outlier = (datos: number[]): number[] => datos.filter(outliers());