import { setLeaderboardStat } from './leaderboard/leaderboard';
import {
  endListenLBUpdates,
  startListenLBUpdates,
} from './leaderboard/leaderboardListenerHandle';
import { cleanupLBListener } from './leaderboard/cleanupLBListener';

const startLBListenPair = {
  msg: 'enter_leaderboard',
  action: () => {
    setLeaderboardStat(true);
    cleanupLBListener();
    startListenLBUpdates();
  },
};

const endLBListenPair = {
  msg: 'exit_leaderboard',
  action: () => {
    setLeaderboardStat(false);
    endListenLBUpdates();
  },
};

export let lbRoutes = [startLBListenPair, endLBListenPair];
