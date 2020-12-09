import { startListenUserAction } from './user/userAction';

const startListenUserPair = {
  msg: 'start_userlisten',
  action: startListenUserAction,
};

export const userRoutes = [startListenUserPair];
