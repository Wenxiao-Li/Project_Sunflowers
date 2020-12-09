import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon48.png';
import '../../assets/img/icon128.png';
import { dbHandle } from './modules/firestore';
import { runListener } from './controller/messageListener';
import { sessionPairArr } from './controller/sessionController';
import { lbPairArr } from './controller/leaderboardController';
import { userArr } from './controller/userSnapshotController';
import { startListenUserUpdates } from './controller/usersnapshot/userUpdatesListener';

console.log('This is the background page.');

dbHandle();

let pairArr = sessionPairArr;

pairArr = pairArr.concat(lbPairArr);

pairArr = pairArr.concat(userArr);

startListenUserUpdates();

runListener(pairArr);
