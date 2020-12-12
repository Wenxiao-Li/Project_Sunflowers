import {
  addRequest,
  addFriend,
  deleteFriend,
  deleteRequest,
  validateEmail,
  acceptRequest,
} from './friendDAOManager';

export const addRequestAction = (request, sender, sendResponse) => {
  addRequest(
    request.useremail,
    request.friendemail,
    request.friendname,
    sendResponse
  );
};

export const addFriendAction = (request, sender, sendResponse) => {
  addFriend(
    request.useremail,
    request.friendemail,
    request.friendname,
    sendResponse
  );
};

export const deleteFriendAction = (request, sender, sendResponse) => {
  deleteFriend(
    request.useremail,
    request.friendemail,
    request.friendname,
    sendResponse
  );
};

export const deleteRequestAction = (request, sender, sendResponse) => {
  deleteRequest(
    request.useremail,
    request.friendemail,
    request.friendname,
    sendResponse
  );
};

export const validateEmailAction = (request, sender, sendResponse) => {
  validateEmail(request.email, sendResponse);
};

export const acceptRequestAction = (request, sender, sendResponse) => {
  acceptRequest(request.email, request.name, sendResponse);
};
