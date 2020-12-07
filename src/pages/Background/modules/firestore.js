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
    .doc(userEmail)
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
            blocklist: [],
            allowlist: [],
            user_flower: 0,
            reactions: { '0x1F496': [], '0x1F525': [], '0x1F603': [] },
            friends: [],
            friendname: [],
            friend2: [],
            friendname2: [],
          })
          .then(() => {
            callback();
          })
          .catch((error) => {
            console.error('Error writing document: ', error);
          });
        db.collection('user')
          .doc(userEmail)
          .collection('sessions')
          .doc()
          .set({
            session_length: 30,
            is_complete: false,
            start_time: new Date(),
            end_time: new Date(),
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

const viewFriend = (friendList, callback) => {
  var nameList = [];
  for (var i = 0; i < friendList.length; i++) {
    viewWebsite(friendList[i], (doc) => {
      var fn = doc.data().last_name;
      var ln = doc.data().first_name;
      var friendName = fn + " " + ln;
      console.log(friendName);
      nameList.push(friendName);
      console.log(nameList);
    })
  }
  callback(nameList);
}

const addRequest = (userEmail, friendemail, friendname, callback) => {
  db.collection('user').doc(userEmail).update({
    friend2: firebase.firestore.FieldValue.arrayUnion(friendemail),
    friendname2: firebase.firestore.FieldValue.arrayUnion(friendname),
  }).then(() => {
    callback();
  }).catch((error) => {
    console.error('Error writing document: ', error);
  });
}

const addFriend = (userEmail, friendemail, friendname, callback) => {
  db.collection('user').doc(userEmail).update({
    friends: firebase.firestore.FieldValue.arrayUnion(friendemail),
    friendname: firebase.firestore.FieldValue.arrayUnion(friendname),
  }).then(() => {
    callback();
  }).catch((error) => {
    console.error('Error writing document: ', error);
  });
}

const deleteFriend = (userEmail, friendemail, friendname, callback) => {
  db.collection('user').doc(userEmail).update({
    friends: firebase.firestore.FieldValue.arrayRemove(friendemail),
    friendname: firebase.firestore.FieldValue.arrayRemove(friendname),
  }).then(() => {
    callback();
  }).catch((error) => {
    console.error('Error writing document: ', error)
  });
}

const deleteFriend2 = (userEmail, friendemail, friendname, callback) => {
  db.collection('user').doc(userEmail).update({
    friend2: firebase.firestore.FieldValue.arrayRemove(friendemail),
    friendname2: firebase.firestore.FieldValue.arrayRemove(friendname),
  }).then(() => {
    callback();
  }).catch((error) => {
    console.error('Error writing document: ', error)
  });
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
    } else if (request.command === 'add_request') {
      addRequest(request.useremail, request.friendemail, request.friendname, () => {
        sendResponse({ message: 'success' });
      })
    } else if (request.command === 'add_friend') {
      addFriend(request.useremail, request.friendemail, request.friendname, () => {
        sendResponse({ message: 'success' });
      })
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
    }
    else if (request.command === 'delete_friend') {
      deleteFriend(request.useremail, request.friendemail, request.friendname, () => {
        sendResponse({ message: 'success' });
      })
    } else if (request.command === 'delete_friend2') {
      deleteFriend2(request.useremail, request.friendemail, request.friendname, () => {
        sendResponse({ message: 'success' });
      })
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
