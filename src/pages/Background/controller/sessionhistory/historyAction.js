import { viewHistory } from './historyDAOManager';
import { getSessions } from '../../model/historyDAO';

export const viewHistoryAction = (request, sender, sendResponse) => {
  console.log('historyAction start');
  getSessions(request.user, viewHistory, sendResponse);
};
