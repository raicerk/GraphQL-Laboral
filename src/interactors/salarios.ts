import { avg } from '../helpers/math';
import { SalariosPorSkill, Salarios } from '../interfaces/salarios';
import { dataPorSkill } from '../data/sueldos';
import { Filtros } from '../interfaces/filtros';
import {outlier} from '../helpers/stadistic';


export const interSalarios = async (where: Filtros): Promise<Salarios[]>=> {

  const snapshot = await dataPorSkill(where);

  return snapshot.map((iter: SalariosPorSkill) => {

    const normalizadoMinimo = outlier(iter.sueldominimo);
    const normalizadoMaximo = outlier(iter.sueldomaximo);

    const sueldominimo = Math.min(...normalizadoMinimo);
    const sueldomaximo = Math.max(...normalizadoMaximo);

    const promediominimo = Math.round(avg(normalizadoMinimo));
    const promediomaximo = Math.round(avg(normalizadoMaximo));

    return {
      skill: iter._id,
      salariominimo: sueldominimo,
      salariomaximo: sueldomaximo,
      media: Math.round(avg([promediominimo,promediomaximo])),
      cantidad: normalizadoMinimo.length
    };
  });
};
