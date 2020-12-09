import { setLeaderboardStat } from './leaderboard/leaderboard';
import {
  endListenLBUpdates,
  startListenLBUpdates,
} from './leaderboard/lbUpdatesListener';

const startLBListenPair = {
  msg: 'enter_leaderboard',
  action: () => {
    setLeaderboardStat(true);
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

export let lbPairArr = [startLBListenPair, endLBListenPair];