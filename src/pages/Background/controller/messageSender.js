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
  var fields = {
    msg: 'query_snapshot',
    qsnapshot: querysnapshot,
  };
  chrome.runtime.sendMessage(fields);
};

export const startListenUserUpdates = () => {
  currentUserListenerHandle(userListener, onUserUpdate);
};

export const endListenUserUpdates = () => {
  unsubscriberUser && unsubscriberUser();
};

export const startListenLBUpdates = () => {
  currentUserListenerHandle(leaderboardListener, sendFriendQuerySnapshot);
};

export const endListenLBUpdates = () => {
  unsubscriberLeaderboard && unsubscriberLeaderboard();
};
