export interface IScheduleUpdate {
  observacao: string;
  status: string;
}

export interface IScheduleGetById {
  id: number;
  professor: string;
  data: string;
  aluno: string;
  horaFim: string;
  horaInicio: string;
  dataAtualizacao: string;
  dataCriacao: string;
  status: string;
  observacaoAluno: string;
  observacaoProfessor: string;
}

export default interface ISchedule {
  professor: number;
  data: string;
  horaInicio: string;
  horaFim: string;
  observacao: string;
}
