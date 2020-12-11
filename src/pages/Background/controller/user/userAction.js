import { cleanupUserListener } from './cleanupUserListener';
import { startListenUserUpdates } from './userListenerHandle';
import {
  addBlocklist,
  addAllowlist,
  deleteBlocklist,
  deleteAllowlist,
} from './userDAOManager';

export const sendUserSnapshotAction = (request, sender, sendResponse) => {
  cleanupUserListener();
  startListenUserUpdates();
};

export const addBlocklistAction = (request, sender, sendResponse) => {
  addBlocklist(request.blocklist, sendResponse);
};

export const addAllowlistAction = (request, sender, sendResponse) => {
  addAllowlist(request.allowlist, sendResponse);
};

export const deleteBlocklistAction = (request, sender, sendResponse) => {
  deleteBlocklist(request.blocklist, sendResponse);
};

export const deleteAllowlistAction = (request, sender, sendResponse) => {
  deleteAllowlist(request.allowlist, sendResponse);
};
