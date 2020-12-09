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

const addBlocklist = (userEmail, blockList, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      blocklist: firebase.firestore.FieldValue.arrayUnion(blockList),
    })
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

const addAllowlist = (userEmail, allowList, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      allowlist: firebase.firestore.FieldValue.arrayUnion(allowList),
    })
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

const deleteBlocklist = (userEmail, blockList, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      blocklist: firebase.firestore.FieldValue.arrayRemove(blockList),
    })
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

const deleteAllowlist = (userEmail, allowList, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      allowlist: firebase.firestore.FieldValue.arrayRemove(allowList),
    })
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

const addRequest = (userEmail, friendemail, friendname, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      friend2: firebase.firestore.FieldValue.arrayUnion(friendemail),
      friendname2: firebase.firestore.FieldValue.arrayUnion(friendname),
    })
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

const addFriend = (userEmail, friendemail, friendname, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      friends: firebase.firestore.FieldValue.arrayUnion(friendemail),
      friendname: firebase.firestore.FieldValue.arrayUnion(friendname),
    })
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

const deleteFriend = (userEmail, friendemail, friendname, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      friends: firebase.firestore.FieldValue.arrayRemove(friendemail),
      friendname: firebase.firestore.FieldValue.arrayRemove(friendname),
    })
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
};

const deleteFriend2 = (userEmail, friendemail, friendname, callback) => {
  db.collection('user')
    .doc(userEmail)
    .update({
      friend2: firebase.firestore.FieldValue.arrayRemove(friendemail),
      friendname2: firebase.firestore.FieldValue.arrayRemove(friendname),
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
    if (request.command === 'set_name') {
      updateName(request.useremail, request.firstname, request.lastname, () => {
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
    } else if (request.command === 'add_request') {
      addRequest(
        request.useremail,
        request.friendemail,
        request.friendname,
        () => {
          sendResponse({ message: 'success' });
        }
      );
    } else if (request.command === 'add_friend') {
      addFriend(
        request.useremail,
        request.friendemail,
        request.friendname,
        () => {
          sendResponse({ message: 'success' });
        }
      );
    } else if (request.command === 'view_friend') {
      db.collection('user')
        .doc(request.useremail)
        .get()
        .then((doc) => {
          sendResponse({
            message: 'success',
            friend: doc.data().friendname,
          });
        })
        .catch((error) => {
          console.log('Error getting document', error);
        });
    } else if (request.command === 'view_friend2') {
      db.collection('user')
        .doc(request.useremail)
        .get()
        .then((doc) => {
          sendResponse({
            message: 'success',
            friend: doc.data().friendname2,
          });
        })
        .catch((error) => {
          console.log('Error getting document', error);
        });
    } else if (request.command === 'delete_friend') {
      deleteFriend(
        request.useremail,
        request.friendemail,
        request.friendname,
        () => {
          sendResponse({ message: 'success' });
        }
      );
    } else if (request.command === 'delete_friend2') {
      deleteFriend2(
        request.useremail,
        request.friendemail,
        request.friendname,
        () => {
          sendResponse({ message: 'success' });
        }
      );
    } else if (request.command === 'view_owner') {
      console.log(request.email);
      db.collection('user')
        .doc(request.email)
        .get()
        .then((doc) => {
          sendResponse({
            fn: doc.data().first_name,
            ln: doc.data().last_name,
          });
        })
        .catch((error) => {
          console.log('Error getting document', error);
        });
    }
    return true;
  });
};
