import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon48.png';
import '../../assets/img/icon128.png';
import { dbHandle } from './modules/firestore';
import { runListener } from './modules/messageListener';
import { injectToActiveTab } from './modules/scriptInjection';
import { sessionPairArr, initSession } from './controller/sessionController';

console.log('This is the background page.');
console.log('Put the background scripts here.');

dbHandle();

initSession();

runListener(sessionPairArr);

injectToActiveTab();
