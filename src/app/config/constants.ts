import { NotifierOptions } from "angular-notifier";

export const NOTIFIER_CONFIG: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 24
    },
    vertical: {
      position: 'top',
      distance: 24
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true
  }
};

export const ROLE_ALUNO = "ROLE_ALUNO";
export const ROLE_PROFESSOR = "ROLE_PROFESSOR";

export const JWT_LOCAL_STORAGE = 'AgendamentoAula@Jwt';
export const USER_LOCAL_STORAGE = 'AgendamentoAula@Me';

export const STATUS_SCHEDULE = [
  { label: 'A confirmar', value: 'A_CONFIRMAR' },
  { label: 'Confirmado', value: 'CONFIRMADO' },
  { label: 'Negado', value: 'NEGADO' },
  { label: 'Cancelado', value: 'CANCELADO' },
  { label: 'Executado', value: 'EXECUTADO' },
];

export const TEACHER_STATUS_SCHEDULE = [
  { label: 'A confirmar', value: 'A_CONFIRMAR', disabled: true },
  { label: 'Confirmado', value: 'CONFIRMADO', disabled: false },
  { label: 'Negado', value: 'NEGADO', disabled: false },
  { label: 'Cancelado', value: 'CANCELADO', disabled: false },
  { label: 'Executado', value: 'EXECUTADO', disabled: false },
];

export const STUDENT_STATUS_SCHEDULE = [
  { label: 'A confirmar', value: 'A_CONFIRMAR', disabled: true },
  { label: 'Confirmado', value: 'CONFIRMADO', disabled: true },
  { label: 'Negado', value: 'NEGADO', disabled: true },
  { label: 'Cancelado', value: 'CANCELADO', disabled: false },
  { label: 'Executado', value: 'EXECUTADO', disabled: true }
];
