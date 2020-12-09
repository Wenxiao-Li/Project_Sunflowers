import firebase from '../modules/firebaseconfig';
import { guestSetup } from './user/guestSetup';

export const listenerAuthHandle = (listener, callback) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      listener(user, callback);
    } else {
      guestSetup();
    }
  });
};
