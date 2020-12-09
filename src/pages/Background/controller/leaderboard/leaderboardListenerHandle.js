import { listenerAuthHandle } from '../listenerAuthHandle';
import {
  unsubscriberLeaderboard,
  leaderboardListener,
} from '../../model/leaderboardListener';
import { sendLBFriendsSnapshot } from './leaderboard';

export const startListenLBUpdates = () => {
  console.log('startLBListener');
  listenerAuthHandle(leaderboardListener, sendLBFriendsSnapshot);
};

export const endListenLBUpdates = () => {
  console.log('unsubscribe lb update');
  unsubscriberLeaderboard && unsubscriberLeaderboard();
};
