import { getUserSnapshot, sendUserSnapshot } from './user';

export const sendUserSnapshotAction = (request, sender, sendResponse) => {
  sendUserSnapshot(getUserSnapshot());
};
