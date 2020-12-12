import {
  decreaseTimeAction,
  increaseTimeAction,
  toggleModeAction,
  startSessionAction,
  toggleSessionAction,
  quitSessionAction,
  returnSessionAction,
  initFieldAction,
} from './session/sessionAction';

const decreaseTimePair = {
  msg: 'decrease-time',
  action: decreaseTimeAction,
};

const increaseTimePair = {
  msg: 'increase-time',
  action: increaseTimeAction,
};

const toggleModePair = {
  msg: 'toggle-mode',
  action: toggleModeAction,
};

const startSessionPair = {
  msg: 'start-session',
  action: startSessionAction,
};

const toggleSessionPair = {
  msg: 'toggle-session',
  action: toggleSessionAction,
};

const quitSessionPair = {
  msg: 'quit-session',
  action: quitSessionAction,
};

const returnSessionPair = {
  msg: 'return-session',
  action: returnSessionAction,
};

const initFieldPair = {
  msg: 'init-display',
  action: initFieldAction,
};

export let sessionPairArr = [
  decreaseTimePair,
  increaseTimePair,
  toggleModePair,
  startSessionPair,
  toggleSessionPair,
  quitSessionPair,
  returnSessionPair,
  initFieldPair,
];
