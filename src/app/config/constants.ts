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
  { label: 'A Confirmar', value: 'A_CONFIRMAR' },
  { label: 'Confirmado', value: 'CONFIRMADO' },
  { label: 'Negado', value: 'NEGADO' },
  { label: 'Cancelado', value: 'CANCELADO' },
  { label: 'Executado', value: 'EXECUTADO' },
];
