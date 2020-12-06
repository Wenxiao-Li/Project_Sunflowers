import { db } from './firebaseconfig';
var firebase = require('firebase').default;

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

const setName = (userEmail, firstName, lastName, callback) => {
  db.collection('user')
    .doc(user.email)
    .get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        callback();
      } else {
        db.collection('user')
          .doc(userEmail)
          .set({
            first_name: firstName,
            last_name: lastName,
            blacklist: [],
            whitelist: [],
          })
          .then(() => {
            callback();
          })
          .catch((error) => {
            console.error('Error writing document: ', error);
          });
      }
    });
};

const addBlacklist = (userEmail, blackList, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      blacklist: firebase.firestore.FieldValue.arrayUnion(blackList),
    })
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

const addWhitelist = (userEmail, whiteList, callback) => {
  console.log('whitelist', whiteList);
  db.collection('user')
    .doc(userEmail)
    .update({
      whitelist: firebase.firestore.FieldValue.arrayUnion(whiteList),
    })
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

const deleteBlacklist = (userEmail, blackList, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      blacklist: firebase.firestore.FieldValue.arrayRemove(blackList),
    })
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

const deleteWhitelist = (userEmail, whiteList, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      whitelist: firebase.firestore.FieldValue.arrayRemove(whiteList),
    })
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

export const viewWebsite = (userEmail, callback) => {
  db.collection('user')
    .doc(userEmail)
    .get()
    .then((doc) => {
      callback(doc);
    })
    .catch((error) => {
      console.log('Error getting document', error);
    });
};

export let dbHandle = () => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'set_name') {
      updateName(request.useremail, request.firstname, request.lastname, () => {
        sendResponse({ message: 'success' });
      });
      return true;
    } else if (request.message === 'sign_in') {
      var user = request.user;
      var name = user.displayName.split(' ');

      setName(user.email, name[0], name[1], () => {
        sendResponse({ message: 'success' });
      });
      return true;
    } else if (request.command === 'add_blacklist') {
      console.log('blacklist', request.blacklist);
      addBlacklist(request.useremail, request.blacklist, () => {
        sendResponse({ message: 'success' });
      });
      return true;
    } else if (request.command === 'add_whitelist') {
      addWhitelist(request.useremail, request.whitelist, () => {
        sendResponse({ message: 'success' });
      });
      return true;
    } else if (request.command === 'delete_blacklist') {
      deleteBlacklist(request.useremail, request.blacklist, () => {
        sendResponse({ message: 'success' });
      });
      return true;
    } else if (request.command === 'delete_whitelist') {
      deleteWhitelist(request.useremail, request.whitelist, () => {
        sendResponse({ message: 'success' });
      });
      return true;
    } else if (request.command === 'view_website') {
      viewWebsite(request.useremail, (doc) => {
        sendResponse({
          message: 'success',
          bl: doc.data().blacklist,
          wl: doc.data().whitelist,
        });
      });
      return true;
    }
  });
};