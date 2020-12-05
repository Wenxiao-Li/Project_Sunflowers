import { Session } from './session';
import * as Status from './sessionStatus';

export const initSessionCallbacks = (updateCallback, completeCallback) => {
  Session.updateCallback = updateCallback;
  Session.completeCallback = completeCallback;
};

export const decreaseTimeAction = (request, sender, sendResponse, callback) => {
  Session.decreaseTime();
};

export const increaseTimeAction = (request, sender, sendResponse, callback) => {
  Session.increaseTime();
};

export const toggleModeAction = (request, sender, sendResponse, callback) => {
  Session.toggleMode();
};

export const startSessionAction = (request, sender, sendResponse, callback) => {
  Session.startSession(callback);
};

export const toggleSessionAction = (
  request,
  sender,
  sendResponse,
  callback
) => {
  const [pauseCallback, resumeCallback] = callback();
  Session.toggleSession(pauseCallback, resumeCallback);
};

export const quitSessionAction = (request, sender, sendResponse, callback) => {
  Session.quitSession(callback);
};

export const returnSessionAction = (
  request,
  sender,
  sendResponse,
  callback
) => {
  Session.status = Status.STATUS_NOT_STARTED;
  Session.updateUnStartedTime();
};

export const initFieldAction = (request, sender, sendResponse, callback) => {
  Session.forceUpdateSession();
};
