import { Session } from './session';
import * as Status from './sessionConstant';
import {
  startCallback,
  pauseCallback,
  resumeCallback,
  quitCallback,
} from './sessionCallbacks';

export const decreaseTimeAction = (request, sender, sendResponse) => {
  Session.decreaseTime();
};

export const increaseTimeAction = (request, sender, sendResponse) => {
  Session.increaseTime();
};

export const toggleModeAction = (request, sender, sendResponse) => {
  Session.toggleMode();
};

export const startSessionAction = (request, sender, sendResponse) => {
  Session.startSession(startCallback);
};

export const toggleSessionAction = (request, sender, sendResponse) => {
  Session.toggleSession(pauseCallback, resumeCallback);
};

export const quitSessionAction = (request, sender, sendResponse) => {
  Session.quitSession(quitCallback);
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

export const initFieldAction = (request, sender, sendResponse) => {
  Session.forceUpdateSession();
};
