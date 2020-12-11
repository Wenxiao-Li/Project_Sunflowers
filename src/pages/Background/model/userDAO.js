import firebase, { db } from '../modules/firebaseconfig';

export const incrementFlower = (userEmail, number) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      user_flower: firebase.firestore.FieldValue.increment(number),
    });
};

export const addBlocklist = (userEmail, blockList, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      blocklist: firebase.firestore.FieldValue.arrayUnion(blockList),
    })
    .then(() => {
      callback({ message: 'success' });
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      callback({ message: 'failure at dao' });
    });
};

export const addAllowlist = (userEmail, allowList, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      allowlist: firebase.firestore.FieldValue.arrayUnion(allowList),
    })
    .then(() => {
      callback({ message: 'success' });
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      callback({ message: 'failure at dao' });
    });
};

export const deleteBlocklist = (userEmail, blockList, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      blocklist: firebase.firestore.FieldValue.arrayRemove(blockList),
    })
    .then(() => {
      callback({ message: 'success' });
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      callback({ message: 'failure at dao' });
    });
};

export const deleteAllowlist = (userEmail, allowList, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      allowlist: firebase.firestore.FieldValue.arrayRemove(allowList),
    })
    .then(() => {
      callback({ message: 'success' });
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      callback({ message: 'failure at dao' });
    });
};
