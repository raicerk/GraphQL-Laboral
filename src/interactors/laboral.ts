import { LaboralesConFiltro } from "../data/laborales";
import { Filtros } from "../interfaces/filtros";
import {
  SkillAgrupados,
  Laboral,
  SkillAcumulados,
} from "../interfaces/laboral";

export const interLaboralesAgrupadosPorMes = async (
  where: Filtros
): Promise<SkillAgrupados[]> => {
  const data = await LaboralesConFiltro(where);

  const rawSkills = data.reduce(
    (acc: string[], it) => ((acc = [...acc, ...it.skill]), acc),
    []
  );

  const skills = [...new Set(rawSkills)];

  const organizados = skills
    .map((skill) => {
      const acumulados = data.reduce((acu, ite: Laboral) => {
        let count: number = 0;
        const fecha = `${ite.fecha.split("-")[0]}-${ite.fecha.split("-")[1]}`;
        if (ite.skill.findIndex((s) => s === skill) !== -1) {
          count = acu[fecha];
          acu[fecha] = count ? count + 1 : 1;
        }
        return acu;
      }, {});
      const datos = Object.entries(acumulados)
        .map(([fecha, cantidad]) => ({ fecha, cantidad }))
        .sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
      return {
        skill,
        datos,
      };
    })
    .sort((x, y) => (x.skill > y.skill ? 1 : -1));

  return organizados;
};

export const interLaboralesAcumulados = async (
  where: Filtros
): Promise<SkillAcumulados[]> => {
  const data = await LaboralesConFiltro(where);

  const rawSkills = data.reduce(
    (acc: string[], it) => ((acc = [...acc, ...it.skill]), acc),
    []
  );

  const skills = [...new Set(rawSkills)];

  const agrupados = skills
    .map((skill) => {
      const cantidad = data.reduce((acc, entry) => {
        if (entry.skill.findIndex((s) => s === skill) !== -1) {
          acc++;
        }
        return acc;
      }, 0);
      return {
        skill,
        cantidad,
      };
    })
    .sort((x, y) => (x.skill > y.skill ? 1 : -1));

  return agrupados;
};
