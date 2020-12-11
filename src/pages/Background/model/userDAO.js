import firebase, { db } from '../modules/firebaseconfig';

export const incrementFlower = (userEmail, number) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      user_flower: firebase.firestore.FieldValue.increment(number),
    });
};

export const addBlocklist = (userEmail, blockList, sendResponse) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      blocklist: firebase.firestore.FieldValue.arrayUnion(blockList),
    })
    .then(() => {
      sendResponse({ message: 'success' });
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      sendResponse({ message: 'failure at dao' });
    });
};

export const addAllowlist = (userEmail, allowList, sendResponse) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      allowlist: firebase.firestore.FieldValue.arrayUnion(allowList),
    })
    .then(() => {
      sendResponse({ message: 'success' });
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      sendResponse({ message: 'failure at dao' });
    });
};

export const deleteBlocklist = (userEmail, blockList, sendResponse) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      blocklist: firebase.firestore.FieldValue.arrayRemove(blockList),
    })
    .then(() => {
      sendResponse({ message: 'success' });
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      sendResponse({ message: 'failure at dao' });
    });
};

export const deleteAllowlist = (userEmail, allowList, sendResponse) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      allowlist: firebase.firestore.FieldValue.arrayRemove(allowList),
    })
    .then(() => {
      sendResponse({ message: 'success' });
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      sendResponse({ message: 'failure at dao' });
    });
};
