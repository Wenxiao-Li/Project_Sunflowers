import {
  currentUserListenerHandle,
  unsubscriberUser,
  userListener,
  unsubscriberLeaderboard,
  leaderboardListener,
} from '../model/dblistener';
import { updateLocalLists } from './websiteLists/websiteLists';

const sendUserSnapshot = (snapshot) => {
  var fields = {
    msg: 'user_snapshot',
    snapshotdata: snapshot.data(),
  };
  chrome.runtime.sendMessage(fields);
};

const onUserUpdate = (snapshot) => {
  updateLocalLists(snapshot);
  sendUserSnapshot(snapshot);
};

const sendFriendQuerySnapshot = (querysnapshot) => {
  let snapshotArr = [];
  let size = querysnapshot.size;
  querysnapshot.forEach(function (doc) {
    snapshotArr = snapshotArr.concat(doc.data());
    size = size - 1;
    if (size === 0) {
      var fields = {
        msg: 'query_snapshot',
        qsnapshot: snapshotArr,
      };
      chrome.runtime.sendMessage(fields);
    }
  });
};

export const startListenUserUpdates = () => {
  currentUserListenerHandle(userListener, onUserUpdate);
};

export const endListenUserUpdates = () => {
  unsubscriberUser && unsubscriberUser();
};

export const startListenLBUpdates = () => {
  console.log('startLBListener');
  currentUserListenerHandle(leaderboardListener, sendFriendQuerySnapshot);
};

export const endListenLBUpdates = () => {
  console.log('unsubscribe lb update');
  unsubscriberLeaderboard && unsubscriberLeaderboard();
};
