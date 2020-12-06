import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon48.png';
import '../../assets/img/icon128.png';
import { dbHandle } from './modules/firestore';
import { runListener } from './controller/messageListener';
import { injectToActiveTab } from './modules/scriptInjection';
import { sessionPairArr, initSession } from './controller/sessionController';
import { websiteListsArr } from './controller/websiteListsController';
import { dbListener } from './controller/dblistener';
import { updateLocalLists } from './modules/websiteLists';

console.log('This is the background page.');
console.log('Put the background scripts here.');

dbHandle();

initSession();

let pairArr = sessionPairArr.concat(websiteListsArr);

dbListener(updateLocalLists);

runListener(pairArr);

injectToActiveTab();
