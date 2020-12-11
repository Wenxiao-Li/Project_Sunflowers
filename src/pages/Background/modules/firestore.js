import firebase, { db } from './firebaseconfig';

const updateName = (userEmail, firstName, lastName, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      first_name: firstName,
      last_name: lastName,
    })
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

export let dbHandle = () => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let user = firebase.auth().currentUser;
    if (!user) {
      return;
    }
    let useremail = user.email;
    if (request.command === 'set_name') {
      updateName(useremail, request.firstname, request.lastname, () => {
        sendResponse({ message: 'success' });
      });
      return true;
    }
    return true;
  });
};
