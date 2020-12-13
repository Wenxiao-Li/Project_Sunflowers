import firebase, { db } from '../modules/firebaseconfig';

export const Today = firebase.firestore.Timestamp.fromDate(new Date()).toDate();
export const getSessions = (user, callback, callback2) => {
  console.log('sessionlistener start');
  let SessionUser;
  var userSessionRef = db
    .collection('user')
    .doc(user.email)
    .collection('sessions');
  SessionUser = userSessionRef.get().then(function (querySnapshot) {
    console.log('session user snapshot does exist');
    console.log(callback);
    callback(querySnapshot);
    callback2();
  });
};
