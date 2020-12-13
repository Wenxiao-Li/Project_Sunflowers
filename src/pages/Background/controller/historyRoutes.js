import { viewHistoryAction } from './sessionhistory/historyAction';

const viewHistoryPair = {
  msg: 'view_history',
  action: viewHistoryAction,
};

export const historyRoutes = [viewHistoryPair];
