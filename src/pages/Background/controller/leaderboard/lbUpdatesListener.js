import {
  currentUserListenerHandle,
  unsubscriberLeaderboard,
  leaderboardListener,
} from '../../model/dblistener';
import { sendLBFriendsSnapshot } from './leaderboard';

export const startListenLBUpdates = () => {
  console.log('startLBListener');
  currentUserListenerHandle(leaderboardListener, sendLBFriendsSnapshot);
};

export const endListenLBUpdates = () => {
  console.log('unsubscribe lb update');
  unsubscriberLeaderboard && unsubscriberLeaderboard();
};
