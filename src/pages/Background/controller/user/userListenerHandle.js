import { listenerAuthHandle } from '../listenerAuthHandle';
import { unsubscriberUser, userListener } from '../../model/userListener';
import { onUserUpdate } from './user';

export const startListenUserUpdates = () => {
  listenerAuthHandle(userListener, onUserUpdate);
};

export const endListenUserUpdates = () => {
  unsubscriberUser && unsubscriberUser();
};
