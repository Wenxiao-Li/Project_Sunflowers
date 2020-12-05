import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon48.png';
import '../../assets/img/icon128.png';
import { dbHandle } from './modules/firestore';
import { runSession } from './modules/sessionController';
import { injectToActiveTab } from './modules/scriptInjection';

console.log('This is the background page.');
console.log('Put the background scripts here.');

dbHandle();

runSession();

injectToActiveTab();
