import {
  sendUserSnapshotAction,
  addAllowlistAction,
  addBlocklistAction,
  deleteAllowlistAction,
  deleteBlocklistAction,
} from './user/userAction';

const getSnapshotPair = {
  msg: 'get_snapshot',
  action: sendUserSnapshotAction,
};

const addAllowlistPair = {
  msg: 'add_allowlist',
  action: addAllowlistAction,
};

const addBlocklistPair = {
  msg: 'add_blocklist',
  action: addBlocklistAction,
};

const deleteAllowlistPair = {
  msg: 'delete_allowlist',
  action: deleteAllowlistAction,
};

const deleteBlocklistPair = {
  msg: 'delete_blocklist',
  action: deleteBlocklistAction,
};

export const userRoutes = [
  getSnapshotPair,
  addAllowlistPair,
  addBlocklistPair,
  deleteBlocklistPair,
  deleteAllowlistPair,
];
