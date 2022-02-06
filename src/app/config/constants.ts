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
