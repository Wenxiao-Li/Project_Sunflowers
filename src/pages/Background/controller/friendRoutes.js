import {
  validateEmailAction,
  addRequestAction,
  addFriendAction,
  deleteRequestAction,
  deleteFriendAction,
  acceptRequestAction,
} from './friend/friendAction';

const validateEmailPair = {
  msg: 'view_owner',
  action: validateEmailAction,
};

const addRequestPair = {
  msg: 'add_request',
  action: addRequestAction,
};

const addFriendPair = {
  msg: 'add_friend',
  action: addFriendAction,
};

const deleteRequestPair = {
  msg: 'delete_request',
  action: deleteRequestAction,
};

const deleteFriendPair = {
  msg: 'delete_friend',
  action: deleteFriendAction,
};

const acceptRequestPair = {
  msg: 'accept_request',
  action: acceptRequestAction,
};

export const friendRoutes = [
  validateEmailPair,
  addRequestPair,
  addFriendPair,
  deleteFriendPair,
  deleteRequestPair,
  acceptRequestPair,
];
