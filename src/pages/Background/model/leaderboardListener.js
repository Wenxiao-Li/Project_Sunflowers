import firebase, { db } from '../modules/firebaseconfig';

export let unsubscriberLeaderboard;
export let onListenLB = false;

export const closeOnListenLB = () => {
  onListenLB = false;
};

export const leaderboardListener = (user, callback) => {
  db.collection('user')
    .doc(user.email)
    .get()
    .then((docsnapshot) => {
      let items = docsnapshot.data().friends;
      items.push(user.email);
      unsubscriberLeaderboard = db
        .collection('user')
        .where(firebase.firestore.FieldPath.documentId(), 'in', items)
        .onSnapshot((snapshot) => {
          onListenLB = true;
          callback(snapshot);
        });
    })
    .catch((error) => {
      console.log('get error: ', error);
    });
};
