import firebase, { db } from '../modules/firebaseconfig';

export const getAllLists = (userEmail) => {
  return db
    .collection('user')
    .doc(userEmail)
    .get()
    .then((doc) => {
      return [doc.data().blocklist, doc.data().allowlist];
    })
    .catch((error) => {
      console.log('Error getting document', error);
    });
};
