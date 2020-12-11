import firebase from '../modules/firebaseconfig';
import { guestSetup } from './user/guestSetup';

export const listenerAuthHandle = (listener, callback) => {
  if (firebase.auth().currentUser) {
    console.log('auth changed: ', firebase.auth().currentUser.email);
    listener(firebase.auth().currentUser, callback);
  } else {
    guestSetup();
  }
};
