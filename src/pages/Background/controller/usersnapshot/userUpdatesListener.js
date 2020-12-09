import {
  currentUserListenerHandle,
  unsubscriberUser,
  userListener,
} from '../../model/dblistener';
import { onUserUpdate } from './user';

export const startListenUserUpdates = () => {
  currentUserListenerHandle(userListener, onUserUpdate);
};

export const endListenUserUpdates = () => {
  unsubscriberUser && unsubscriberUser();
};
