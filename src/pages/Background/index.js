import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon48.png';
import '../../assets/img/icon128.png';
import './modules/firebaseconfig';
import { dbHandle } from './modules/firestore';
import {processSessionCountdown} from './modules/session-countdown';

dbHandle();
processSessionCountdown();
console.log('This is the background page.');
console.log('Put the background scripts here.');


chrome.webNavigation.onCommitted.addListener(
    function (details) {
        if (details.url.match("https://www.youtube.com/*")){
            chrome.tabs.insertCSS({
                file: 'content.styles.css'
            });
            chrome.tabs.executeScript({
                file: 'contentScript.bundle.js'
            });
        }
    }
);