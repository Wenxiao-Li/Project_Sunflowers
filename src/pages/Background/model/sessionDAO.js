import firebase, { db } from '../modules/firebaseconfig';

export const addSession = (
  userEmail,
  sessionLength,
  isComplete,
  startTime,
  endTime
) => {
  db.collection('user')
    .doc(userEmail)
    .collection('sessions')
    .add({
      session_length: sessionLength,
      is_complete: isComplete,
      start_time: firebase.firestore.Timestamp.fromDate(startTime),
      end_time: firebase.firestore.Timestamp.fromDate(endTime),
    })
    .then(() => {
      console.log('session added');
    })
    .catch((error) => {
      console.log('session adding failed: ', error);
    });
};
