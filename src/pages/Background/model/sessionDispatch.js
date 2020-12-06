import firebase from '../modules/firebaseconfig';
import * as DAO from './sessionDAO';

export const addSession = (sessionLength, isComplete, startTime, endTime) => {
  let user = firebase.auth().currentUser;
  if (user) {
    DAO.addSession(user.email, sessionLength, isComplete, startTime, endTime);
  } else {
    console.log('No user logged in');
  }
};
