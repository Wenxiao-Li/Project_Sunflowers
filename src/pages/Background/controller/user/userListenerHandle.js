import { listenerAuthHandle } from '../listenerAuthHandle';
import {
  unsubscriberUser,
  userListener,
  onListenUser,
  closeOnListenUser,
} from '../../model/userListener';
import { onUserUpdate } from './user';

export const startListenUserUpdates = () => {
  if (onListenUser === true) {
    console.log('fail to close previous user snapshot');
  }
  endListenUserUpdates();
  console.log('start listening for user snapshot');
  listenerAuthHandle(userListener, onUserUpdate);
};

export const endListenUserUpdates = () => {
  if (unsubscriberUser) {
    console.log('unsubsribe user snapshot');
    unsubscriberUser();
    closeOnListenUser();
  } else {
    console.log('unsubscriberUser not defined');
  }
};
