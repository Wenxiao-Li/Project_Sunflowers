import { Session } from './session';
import * as Status from './sessionStatus';

export const initSessionCallbacks = (updateCallback, completeCallback) => {
  Session.updateCallback = updateCallback;
  Session.completeCallback = completeCallback;
};

export const decreaseTimeAction = (callback, sender, sendResponse) => {
  Session.decreaseTime();
};

export const increaseTimeAction = (callback, sender, sendResponse) => {
  Session.increaseTime();
};

export const toggleModeAction = (callback, sender, sendResponse) => {
  Session.toggleMode();
};

export const startSessionAction = (callback, sender, sendResponse) => {
  Session.startSession(callback);
};

export const toggleSessionAction = (callback, sender, sendResponse) => {
  const [pauseCallback, resumeCallback] = callback();
  Session.toggleSession(pauseCallback, resumeCallback);
};

export const quitSessionAction = (callback, sender, sendResponse) => {
  Session.quitSession(callback);
};

export const returnSessionAction = (callback, sender, sendResponse) => {
  Session.status = Status.STATUS_NOT_STARTED;
  Session.updateUnStartedTime();
};

export const initFieldAction = (callback, sender, sendResponse) => {
  Session.forceUpdateSession();
};
