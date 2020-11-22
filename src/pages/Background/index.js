import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon48.png';
import '../../assets/img/icon128.png';
import './modules/firebaseconfig';
import { dbHandle } from './modules/firestore';
import {runSession} from './modules/session';

dbHandle();

let isblocking = false;

const startCallback = function () {
    isblocking = true;
}

const pauseCallback = function ()  {
    isblocking = false;
}

const resumeCallback = function () {
    isblocking = true;
}

const stopCallback = function ()  {
    isblocking = false;
}


runSession(startCallback, stopCallback, pauseCallback, resumeCallback);
console.log('This is the background page.');
console.log('Put the background scripts here.');


// chrome.windows.getAll({ populate: true }, function (windows) {
//     windows.forEach(function (window) {
//         window.tabs.forEach(function (tab) {
//             if (tab.url.match("http://*/*") ||
//                 tab.url.match("https://*/*") ){
//                 chrome.tabs.insertCSS({
//                     file: 'content.styles.css'
//                 });
//                 chrome.tabs.executeScript({
//                     file: 'contentScript.bundle.js'
//                 });
//             }
//         });
//     });
// });


// // Fires when create or navigate to a new tab, won't activate when switching tabs
// chrome.webNavigation.onCommitted.addListener( details => {
//     console.log("isblocking: " + isblocking);
//     if (details.url.match("http://*/*") ||
//         details.url.match("https://*/*") ){
//         chrome.tabs.insertCSS({
//             file: 'content.styles.css'
//         });
//         chrome.tabs.executeScript({
//             file: 'contentScript.bundle.js'
//         }); 
//     }
// });


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.msg);
    if (request.msg === "home-comm"){
        console.log('test home comm success');
    }
});