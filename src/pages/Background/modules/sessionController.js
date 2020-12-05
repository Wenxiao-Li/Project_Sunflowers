import {
  initSessionCallbacks,
  decreaseTimeAction,
  increaseTimeAction,
  toggleModeAction,
  startSessionAction,
  toggleSessionAction,
  quitSessionAction,
  returnSessionAction,
  initFieldAction,
} from './sessionAction';
import {
  startCallback,
  pauseCallback,
  resumeCallback,
  quitCallback,
  updateCallback,
  completeCallback,
} from './sessionCallbacks';

const decreaseTimePair = {
  msg: 'decrease-time',
  action: decreaseTimeAction,
  callback: () => {},
};

const increaseTimePair = {
  msg: 'increase-time',
  action: increaseTimeAction,
  callback: () => {},
};

const toggleModePair = {
  msg: 'toggle-mode',
  action: toggleModeAction,
  callback: () => {},
};

const startSessionPair = {
  msg: 'start-session',
  action: startSessionAction,
  callback: startCallback,
};

const toggleSessionPair = {
  msg: 'toggle-session',
  action: toggleSessionAction,
  callback: () => {
    return [pauseCallback, resumeCallback];
  },
};

const quitSessionPair = {
  msg: 'quit-session',
  action: quitSessionAction,
  callback: quitCallback,
};

const returnSessionPair = {
  msg: 'return-session',
  action: returnSessionAction,
  callback: () => {},
};

const initFieldPair = {
  msg: 'init-display',
  action: initFieldAction,
  callback: () => {},
};

let sessionPairArr = [
  decreaseTimePair,
  increaseTimePair,
  toggleModePair,
  startSessionPair,
  toggleSessionPair,
  quitSessionPair,
  returnSessionPair,
  initFieldPair,
];

// This method would take an actionArr and convert it into an chrome Listener function
const actionArrToListenerFunc = (actionPairArr) => {
  return function (request, sender, sendResponse) {
    actionPairArr.forEach((actionPair) => {
      if (request.msg === actionPair.msg) {
        actionPair.action(actionPair.callback, sender, sendResponse);
      }
    });
    return true;
  };
};

export const runSession = () => {
  initSessionCallbacks(updateCallback, completeCallback);
  chrome.runtime.onMessage.addListener(actionArrToListenerFunc(sessionPairArr));
};
