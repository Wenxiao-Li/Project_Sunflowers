import firebase, { db } from '../modules/firebaseconfig';

import {
  defaultAllowlist,
  defaultBlocklist,
} from '../controller/websiteLists/websiteLists';

export const currentUserListenerHandle = (listener, callback) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      listener(user, callback);
    }
  });
};

export let unsubscriberUser;
export const userListener = (user, callback) => {
  var userColRef = db.collection('user');
  unsubscriberUser = userColRef.doc(user.email).onSnapshot(
    (snapshot) => {
      if (snapshot.exists) {
        console.log('snapshot does exist');
        callback(snapshot);
      } else {
        console.log('snapshot does not exist');
        var name = user.displayName.split(' ');
        userColRef
          .doc(user.email)
          .set({
            first_name: name[0],
            last_name: name[1],
            blocklist: defaultBlocklist,
            allowlist: defaultAllowlist,
            user_flower: 0,
            reactions: { '0x1F496': [], '0x1F525': [], '0x1F603': [] },
            friends: [],
            friendname: [],
            friend2: [],
            friendname2: [],
          })
          .then(() => {
            console.log('succesfully set the doc');
          });
      }
    },
    (error) => {
      console.log('error with snapshot: ', error);
    }
  );
};

export let unsubscriberLeaderboard;

export const leaderboardListener = (user, callback) => {
  var friendsQueryRef = db
    .collection('user')
    .where('friends', 'array-contains', user.email);
  unsubscriberLeaderboard = friendsQueryRef.onSnapshot(callback);
};
