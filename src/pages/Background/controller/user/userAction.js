import { cleanupUserListener } from './cleanupUserListener';
import { startListenUserUpdates } from './userListenerManager';

export const startListenUserAction = (request, sender, sendResponse) => {
  cleanupUserListener();
  startListenUserUpdates();
};
