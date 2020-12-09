import { getUserSnapshot, sendUserSnapshot } from './user';

export const userAction = (request, sender, sendResponse) => {
  sendUserSnapshot(getUserSnapshot());
};
