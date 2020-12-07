import { startListenLBUpdates, endListenLBUpdates } from './messageSender';

const startLBListenPair = {
  msg: 'start_lblisten',
  action: startListenLBUpdates,
};

const endLBListenPair = {
  msg: 'close_lblisten',
  action: endListenLBUpdates,
};

export let lbPairArr = [startLBListenPair, endLBListenPair];
