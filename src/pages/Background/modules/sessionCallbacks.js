import { injectToCurrentTabs } from './scriptInjection';
import { addSession } from '../model/sessionDispatch';
import { controlOverlay } from '../model/overlay';
const updateDisplayedTimeMsg = 'update-time';

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

  controlOverlay(minutes, seconds, status, isBlocklist);
};

export const startCallback = function (isBlocklist) {
  console.log('is blocklist mode: ', isBlocklist);

  injectToCurrentTabs();
};

export const completeCallback = function (sessionLength, startDate, endDate) {
  // Update Database
  addSession(sessionLength, true, startDate, endDate);
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
};
