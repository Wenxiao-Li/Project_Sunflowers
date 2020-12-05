import firebase from './firebaseconfig';
import { viewWebsite } from './firestore';
import { insertScript } from './scriptInjection';

const updateDisplayedTimeMsg = 'update-time';

let localBlockList = [];
let localAllowList = [];

const updateLocalLists = (doc) => {
  localBlockList = doc.data().blacklist;
  localAllowList = doc.data().whitelist;

  var i;
  for (i = 0; i < localBlockList.length; i++) {
    localBlockList[i] += '/*';
  }
  for (i = 0; i < localAllowList.length; i++) {
    localAllowList[i] += '/*';
  }
};

export const updateCallback = function (minutes, seconds, status, isBlocklist) {
  console.log('update');
  chrome.runtime.sendMessage({
    msg: updateDisplayedTimeMsg,
    data: {
      minutes: minutes,
      seconds: seconds,
      status: status,
      isBlocklist: isBlocklist,
    },
  });

  console.log('locallists:', localBlockList);
  // broadcasting to every tab to update the session info
  // TODO add avoiding non-web tabs
  chrome.tabs.query({ url: localBlockList }, function (tabs) {
    tabs.forEach(function (tab) {
      chrome.tabs.sendMessage(
        tab.id,
        {
          msg: updateDisplayedTimeMsg,
          data: {
            minutes: minutes,
            seconds: seconds,
            status: status,
          },
        },
        () => {
          if (chrome.runtime.lastError) {
            console.log('content script does not exist');
          }
        }
      );
    });
  });
};

export const startCallback = function (isBlocklist) {
  console.log('is blocklist mode: ', isBlocklist);

  // update Local lists
  var currentUser = firebase.auth().currentUser;
  if (currentUser) {
    viewWebsite(currentUser.email, updateLocalLists);
  } else {
  }

  // insert scripts to all tabs (active tabs)
  chrome.tabs.query({ active: true, url: ['https://*/*'] }, function (tabs) {
    tabs.forEach(function (tab) {
      const tabId = tab.id;
      insertScript(tabId);
    });
  });
};

export const completeCallback = function (sessionLength, startDate, endDate) {
  const sessionField = {
    session_length: sessionLength,
    is_complete: true,
    start_time: startDate.toUTCString(),
    end_time: endDate.toUTCString(),
  };
  console.log(sessionField);
  // Update Database
};

export const pauseCallback = function () {
  console.log('pauseCallback');
  // Resume Pause Timer
};

export const resumeCallback = function () {
  console.log('resumeCallback');
  // Stop Pause Timer
};

export const quitCallback = function (sessionLength, startDate, endDate) {
  const sessionField = {
    session_length: sessionLength,
    is_complete: false,
    start_time: startDate.toUTCString(),
    end_time: endDate.toUTCString(),
  };
  console.log(sessionField);
  // Update database
};
