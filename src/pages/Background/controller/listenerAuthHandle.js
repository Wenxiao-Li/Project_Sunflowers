import firebase from '../modules/firebaseconfig';

import {
  defaultAllowlist,
  defaultBlocklist,
  setUserSnapshot,
} from './user/user';

export const listenerAuthHandle = (listener, callback) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      listener(user, callback);
    } else {
      let noLogginSnapShot = {
        data: function () {
          return {
            first_name: 'guest',
            last_name: 'user',
            blocklist: defaultBlocklist,
            allowlist: defaultAllowlist,
            user_flower: 0,
            reactions: { '0x1F496': [], '0x1F525': [], '0x1F603': [] },
            friends: [],
            friendname: [],
            friend2: [],
            friendname2: [],
          };
        },
      };
      setUserSnapshot(noLogginSnapShot);
    }
  });
};
