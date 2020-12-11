import { getLeaderboardStat } from '../leaderboard/leaderboard';
import {
  startListenLBUpdates,
  endListenLBUpdates,
} from '../leaderboard/leaderboardListenerHandle';

let userSnapshot;

export const defaultBlocklist = ['https://www.youtube.com'];
export const defaultAllowlist = ['https://www.google.com'];

export function setUserSnapshot(snapshot) {
  userSnapshot = snapshot;
}

export function getUserSnapshot() {
  return userSnapshot;
}

export function sendUserSnapshot(snapshot) {
  if (snapshot) {
    var fields = {
      msg: 'user_snapshot',
      snapshotdata: snapshot.data(),
    };
    chrome.runtime.sendMessage(fields);
  }
}

export const restartLBSnapshot = (snapshot) => {
  if (getLeaderboardStat() === true) {
    console.log('find in leaderboard');
    if (
      JSON.stringify(snapshot.data().friends) !==
      JSON.stringify(getUserSnapshot().data().friends)
    ) {
      console.log('friends changed');
      endListenLBUpdates();
      startListenLBUpdates();
    }
  }
};

export const onUserUpdate = (snapshot) => {
  setUserSnapshot(snapshot);
  restartLBSnapshot(snapshot);
  sendUserSnapshot(snapshot);
};
