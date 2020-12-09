import firebase, { db } from '../modules/firebaseconfig';

export let unsubscriberLeaderboard;

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
        .onSnapshot(callback);
    })
    .catch((error) => {
      console.log('get error: ', error);
    });
};
