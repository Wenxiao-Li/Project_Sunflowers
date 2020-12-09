import { sendUserSnapshotAction } from './user/userAction';

const getSnapshotPair = {
  msg: 'get_snapshot',
  action: sendUserSnapshotAction,
};

export const userRoutes = [getSnapshotPair];
