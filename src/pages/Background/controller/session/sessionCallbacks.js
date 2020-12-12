import { injectToCurrentTabs } from './overlay/scriptInjection';
import {
  startInjectionListener,
  removeInjectionListener,
} from './overlay/scriptInjection';
import { addSession } from './sessionDAOManager';
import { controlOverlay } from './overlay/overlay';
import { incrementFlower } from '../user/userDAOManager';
const updateDisplayedTimeMsg = 'update-time';

export const updateCallback = function (
  minutes,
  seconds,
  status,
  isBlocklist,
  pauseCounter
) {
  chrome.runtime.sendMessage({
    msg: updateDisplayedTimeMsg,
    data: {
      minutes: minutes,
      seconds: seconds,
      status: status,
      isBlocklist: isBlocklist,
      pauseCounter: pauseCounter,
    },
  });

  controlOverlay(minutes, seconds, status, isBlocklist, pauseCounter);
};

export const startCallback = function (isBlocklist) {
  console.log('is blocklist mode: ', isBlocklist);
  injectToCurrentTabs();
  startInjectionListener();
};

export const completeCallback = function (sessionLength, startDate, endDate) {
  // Update Database
  removeInjectionListener();
  addSession(sessionLength, true, startDate, endDate);
  incrementFlower(Math.floor(sessionLength / 15));
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
  // Update database
  addSession(sessionLength, false, startDate, endDate);
  removeInjectionListener();
};
