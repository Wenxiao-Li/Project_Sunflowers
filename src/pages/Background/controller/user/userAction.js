import { cleanupUserListener } from './cleanupUserListener';
import { startListenUserUpdates } from './userListenerHandle';

export const sendUserSnapshotAction = (request, sender, sendResponse) => {
  cleanupUserListener();
  startListenUserUpdates();
};
