export interface SalariosDetalle {
  _id: string;
  averageMin: number;
  averageMax: number;
  media: number;
  count: number;
}

export interface Salarios {
  skill: string;
  salariominimo: number;
  salariomaximo: number;
  media: number;
  cantidad: number;
}

export interface SalariosPorSkill {
  _id: string;
  sueldominimo: number[];
  sueldomaximo: number[];
}