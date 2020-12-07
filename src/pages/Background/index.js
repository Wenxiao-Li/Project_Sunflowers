import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon48.png';
import '../../assets/img/icon128.png';
import { dbHandle } from './modules/firestore';
import { runListener } from './controller/messageListener';
import { sessionPairArr } from './controller/sessionController';
import { websiteListsArr } from './controller/websiteListsController';
import { lbPairArr } from './controller/leaderboardController';
import { startListenUserUpdates } from './controller/messageSender';

console.log('This is the background page.');

dbHandle();

let pairArr = sessionPairArr.concat(websiteListsArr);

pairArr = pairArr.concat(lbPairArr);

startListenUserUpdates();

runListener(pairArr);
