import { listenerAuthHandle } from '../listenerAuthHandle';
import {
  unsubscriberLeaderboard,
  leaderboardListener,
  onListenLB,
  closeOnListenLB,
} from '../../model/leaderboardListener';
import { sendLBFriendsSnapshot } from './leaderboard';

export const startListenLBUpdates = () => {
  if (onListenLB === true) {
    console.log('failed to close previous snapshot');
  }
  endListenLBUpdates();
  console.log('startLBListener');
  listenerAuthHandle(leaderboardListener, sendLBFriendsSnapshot);
};

export const endListenLBUpdates = () => {
  if (unsubscriberLeaderboard) {
    console.log('unsubscribe lb update');
    unsubscriberLeaderboard();
    closeOnListenLB();
  } else {
    console.log('unsubscriberLeaderboard not defined');
  }
};
