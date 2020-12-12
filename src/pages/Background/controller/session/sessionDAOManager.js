import firebase from '../../modules/firebaseconfig';
import * as sessionDAO from '../../model/sessionDAO';

export const addSession = (sessionLength, isComplete, startTime, endTime) => {
  let user = firebase.auth().currentUser;
  if (user) {
    sessionDAO.addSession(
      user.email,
      sessionLength,
      isComplete,
      startTime,
      endTime
    );
  } else {
    console.log('No user logged in');
  }
};
