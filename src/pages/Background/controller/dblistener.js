import firebase, { db } from '../modules/firebaseconfig';

export const dbListener = (callback) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection('user')
        .doc(user.email)
        .get()
        .then((snapshot) => callback(snapshot))
        .catch((error) => console.log(error));
      db.collection('user')
        .doc(user.email)
        .onSnapshot((snapshot) => {
          callback(snapshot);
        });
    }
  });
};
