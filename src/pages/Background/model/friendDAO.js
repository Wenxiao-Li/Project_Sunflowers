import firebase, { db } from '../modules/firebaseconfig';

export const addRequest = (
  userEmail,
  friendemail,
  friendname,
  sendResponse
) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      friend2: firebase.firestore.FieldValue.arrayUnion(friendemail),
      friendname2: firebase.firestore.FieldValue.arrayUnion(friendname),
    })
    .then(() => {
      sendResponse({ message: 'success' });
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      sendResponse({ message: 'failure at dao' });
    });
};

export const addFriend = (userEmail, friendemail, friendname, sendResponse) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      friends: firebase.firestore.FieldValue.arrayUnion(friendemail),
      friendname: firebase.firestore.FieldValue.arrayUnion(friendname),
    })
    .then(() => {
      sendResponse({ message: 'success' });
      console.log('friend added');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      sendResponse({ message: 'failure at dao' });
    });
};

export const deleteFriend = (
  userEmail,
  friendemail,
  friendname,
  sendResponse
) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      friends: firebase.firestore.FieldValue.arrayRemove(friendemail),
      friendname: firebase.firestore.FieldValue.arrayRemove(friendname),
    })
    .then(() => {
      sendResponse({ message: 'success' });
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      sendResponse({ message: 'failure at dao' });
    });
};

export const deleteFriendRequest = (
  userEmail,
  friendemail,
  friendname,
  sendResponse
) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      friend2: firebase.firestore.FieldValue.arrayRemove(friendemail),
      friendname2: firebase.firestore.FieldValue.arrayRemove(friendname),
    })
    .then(() => {
      sendResponse({ message: 'success' });
      console.log('friend request deleted');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      sendResponse({ message: 'failure at dao' });
    });
};

export const validateEmail = (email, sendResponse) => {
  db.collection('user')
    .doc(email)
    .get()
    .then((doc) => {
      sendResponse({
        fn: doc.data().first_name,
        ln: doc.data().last_name,
      });
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      sendResponse({ message: 'failure at dao' });
    });
};

export const acceptRequest = (user, email, name, sendResponse) => {
  var friendEmail = user.email;
  var friendName = user.displayName;
  addFriend(email, friendEmail, friendName, () => {});
  addFriend(user.email, email, name, () => {});
  deleteFriendRequest(user.email, email, name, () => {});
};
