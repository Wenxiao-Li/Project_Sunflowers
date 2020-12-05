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
        blacklist: [],
        whitelist: [],
        user_flower: 0,
        reactions: { "0x1F496": [], "0x1F525": [], "0x1F603": [] },
        friends: []
      }).then(() => {
        callback();
      }).catch((error) => {
        console.error('Error writing document: ', error);
      });
      db.collection('user').doc(userEmail).collection('sessions').doc().set({
        data: new Date(),
        session_length: 0,
        is_complete: false,
        start_time: "",
        end_time: "",
        num_flower: 0
      }).then(() => {
        callback();
      }).catch((error) => {
        console.error('Error writing document: ', error);
      });
    }
  });
}

const addBlacklist = (userEmail, blackList, callback) => {
  db.collection('user').doc(userEmail).update({
    blacklist: firebase.firestore.FieldValue.arrayUnion(blackList),
  }).then(() => {
    callback();
  }).catch((error) => {
    console.error('Error writing document: ', error);
  });
}

const addWhitelist = (userEmail, whiteList, callback) => {
  db.collection('user').doc(userEmail).update({
    whitelist: firebase.firestore.FieldValue.arrayUnion(whiteList),
  }).then(() => {
    callback();
  }).catch((error) => {
    console.error('Error writing document: ', error);
  });
}

const deleteBlacklist = (userEmail, blackList, callback) => {
  db.collection('user').doc(userEmail).update({
    blacklist: firebase.firestore.FieldValue.arrayRemove(blackList)
  }).then(() => {
    callback();
  }).catch((error) => {
    console.error('Error writing document: ', error)
  });
}

const deleteWhitelist = (userEmail, whiteList, callback) => {
  db.collection('user').doc(userEmail).update({
    whitelist: firebase.firestore.FieldValue.arrayRemove(whiteList)
  }).then(() => {
    callback();
  }).catch((error) => {
    console.error('Error writing document: ', error)
  });
}

const viewWebsite = (userEmail, callback) => {
  db.collection('user').doc(userEmail).onSnapshot(snapshot => {
    callback(snapshot.data().blacklist, snapshot.data().whitelist)
  })
}

export let dbHandle = () => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'set_name') {
      updateName(request.useremail, request.firstname, request.lastname, () => {
        sendResponse({ message: 'success' });
      })
    } else if (request.message === 'sign_in') {
      var user = request.user;
      var name = user.displayName.split(' ');

      setName(user.email, name[0], name[1], () => {
        sendResponse({ message: 'success' });
      })
    } else if (request.command === 'add_blacklist') {
      addBlacklist(request.useremail, request.blacklist, () => {
        sendResponse({ message: 'success' });
      })
    } else if (request.command === 'add_whitelist') {
      addWhitelist(request.useremail, request.whitelist, () => {
        sendResponse({ message: 'success' });
      })
    } else if (request.command === 'delete_blacklist') {
      deleteBlacklist(request.useremail, request.blacklist, () => {
        sendResponse({ message: 'success' });
      })
    } else if (request.command === 'delete_whitelist') {
      deleteWhitelist(request.useremail, request.whitelist, () => {
        sendResponse({ message: 'success' });
      })
    } else if (request.command === 'view_website') {
      viewWebsite(request.useremail, (doc) => {
        console.log("hey you", doc.blacklist)
        sendResponse({ message: "success", bl: doc.blacklist, wl: doc.whitelist })
      })
    }
    return true;
  });
};