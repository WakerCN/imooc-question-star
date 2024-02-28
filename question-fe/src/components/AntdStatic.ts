import { App } from 'antd';

// export const useAntdApp = () => {
//   const staticFunction = App.useApp();

//   const message = staticFunction.message;
//   const modal = staticFunction.modal;
//   const notification = staticFunction.notification;

//   return { message, modal, notification };
// };

import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

export default () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  return null;
};

export { message, notification, modal };
