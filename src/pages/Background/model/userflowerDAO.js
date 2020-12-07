import firebase, { db } from '../modules/firebaseconfig';

export const incrementFlower = (userEmail, number) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      user_flower: firebase.firestore.FieldValue.increment(number),
    });
};
