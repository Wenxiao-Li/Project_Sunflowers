import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon48.png';
import '../../assets/img/icon128.png';
import './modules/firebaseconfig';
import { dbHandle } from './modules/firestore';
import { runSession } from './modules/session';

dbHandle();

const updateDisplayedTimeMsg = 'update-time';

function updateCallback(minutes, seconds, status) {
  console.log('update');
  chrome.runtime.sendMessage({
    msg: updateDisplayedTimeMsg,
    data: {
      minutes: minutes,
      seconds: seconds,
      status: status,
    },
  });

  // broadcasting to every tab to update the session info
  // TODO add avoiding non-web tabs
  chrome.tabs.query({ url: ['https://www.youtube.com/*'] }, function (tabs) {
    tabs.forEach(function (tab) {
      chrome.tabs.sendMessage(tab.id, {
        msg: updateDisplayedTimeMsg,
        data: {
          minutes: minutes,
          seconds: seconds,
          status: status,
        },
      });
    });
  });
}

const startCallback = function () {
  console.log('startCallback');
  // insert scripts to all tabs (active tabs)
  chrome.tabs.query(
    { active: true, url: ['https://www.youtube.com/*'] },
    function (tabs) {
      tabs.forEach(function (tab) {
        const tabId = tab.id;
        insertScript(tabId);
      });
    }
  );
};

const completeCallback = function () {
  alert("Your session has been completed");
  console.log('completeCallback');
  // Update Database
};

const pauseCallback = function () {
  alert("Your session has been paused!");
  console.log('pauseCallback');
  // Resume Pause Timer
};

const resumeCallback = function () {
  alert("Your session has been resumed!");
  console.log('resumeCallback');
  // Stop Pause Timer
};

const quitCallback = function () {
  alert("Your session has been terminated");
  console.log('quitCallback');
  // Update database
};

runSession(
  updateCallback,
  startCallback,
  completeCallback,
  quitCallback,
  pauseCallback,
  resumeCallback
);
console.log('This is the background page.');
console.log('Put the background scripts here.');

const insertScript = (tabId) => {
  chrome.tabs.sendMessage(tabId, { msg: 'are-you-there-content?' }, function (
    response
  ) {
    response = response || {};
    if (response.status != 'yes') {
      chrome.tabs.executeScript(tabId, {
        file: 'contentScript.bundle.js',
      });
    } else {
      console.log('yes');
    }
  });
};

// Will execute when tab is switched, this will not gurantee insertion in already active tabs
chrome.tabs.onActivated.addListener(function (activeInfo) {
  // for the current tab, inject the "inject.js" file & execute it
  const tabId = activeInfo.tabId;
  insertScript(tabId);
});

// Fires when create or reload a new tab, won't activate when switching tabs
chrome.webNavigation.onCommitted.addListener((details) => {
  const tabId = details.tabId;
  insertScript(tabId);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === 'home-comm') {
    console.log('test home comm success');
  }
});

