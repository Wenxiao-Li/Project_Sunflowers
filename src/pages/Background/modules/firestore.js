import { db } from './firebaseconfig';
var firebase = require('firebase').default;

const updateName = (userEmail, firstName, lastName, callback) => {
  db.collection('user').doc(userEmail).update({
    first_name: firstName,
    last_name: lastName,
  }).then(() => {
    callback();
  }).catch((error) => {
    console.error('Error writing document: ', error);
  });
}

const setName = (userEmail, firstName, lastName, callback) => {
  db.collection('user').doc(userEmail).get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      callback();
    } else {
      db.collection('user').doc(userEmail).set({
        first_name: firstName,
        last_name: lastName,
        blocklist: [],
        allowlist: [],
        user_flower: 0,
        reactions: { "0x1F496": [], "0x1F525": [], "0x1F603": [] },
        friendname: [],
        friendname2: [],
        friends: [],
        friend2: []
      }).then(() => {
        callback();
      }).catch((error) => {
        console.error('Error writing document: ', error);
      });
      db.collection('user').doc(userEmail).collection('sessions').doc().set({
        session_length: 30,
        is_complete: false,
        start_time: new Date(),
        end_time: new Date()
      }).then(() => {
        callback();
      }).catch((error) => {
        console.error('Error writing document: ', error);
      });
    }
  });
}

const addBlocklist = (userEmail, blockList, callback) => {
  db.collection('user').doc(userEmail).update({
    blocklist: firebase.firestore.FieldValue.arrayUnion(blockList),
  }).then(() => {
    callback();
  }).catch((error) => {
    console.error('Error writing document: ', error);
  });
}

const addAllowlist = (userEmail, allowList, callback) => {
  db.collection('user').doc(userEmail).update({
    allowlist: firebase.firestore.FieldValue.arrayUnion(allowList),
  }).then(() => {
    callback();
  }).catch((error) => {
    console.error('Error writing document: ', error);
  });
}

const deleteBlocklist = (userEmail, blockList, callback) => {
  db.collection('user').doc(userEmail).update({
    blocklist: firebase.firestore.FieldValue.arrayRemove(blockList)
  }).then(() => {
    callback();
  }).catch((error) => {
    console.error('Error writing document: ', error)
  });
}

const deleteAllowlist = (userEmail, allowList, callback) => {
  db.collection('user').doc(userEmail).update({
    allowlist: firebase.firestore.FieldValue.arrayRemove(allowList)
  }).then(() => {
    callback();
  }).catch((error) => {
    console.error('Error writing document: ', error)
  });
}

const viewWebsite = (userEmail, callback) => {
  db.collection('user').doc(userEmail).onSnapshot(snapshot => {
    callback(snapshot.data().blocklist, snapshot.data().allowlist)
  })
}

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
    } else if (request.command === 'add_blocklist') {
      addBlocklist(request.useremail, request.blocklist, () => {
        sendResponse({ message: 'success' });
      });
      return true;
    } else if (request.command === 'add_allowlist') {
      addAllowlist(request.useremail, request.allowlist, () => {
        sendResponse({ message: 'success' });
      });
      return true;
    } else if (request.command === 'delete_blocklist') {
      deleteBlocklist(request.useremail, request.blocklist, () => {
        sendResponse({ message: 'success' });
      });
      return true;
    } else if (request.command === 'delete_allowlist') {
      deleteAllowlist(request.useremail, request.allowlist, () => {
        sendResponse({ message: 'success' });
      });
      return true;
    } else if (request.command === 'view_website') {
      viewWebsite(request.useremail, (doc) => {
        sendResponse({
          message: 'success',
          bl: doc.data().blocklist,
          al: doc.data().allowlist,
        });
      });
      return true;
    }
  });
};