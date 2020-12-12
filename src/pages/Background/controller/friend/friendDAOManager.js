import * as friendDAO from '../../model/friendDAO';
import firebase from '../../modules/firebaseconfig';

export const addRequest = (
  userEmail,
  friendemail,
  friendname,
  sendResponse
) => {
  let user = firebase.auth().currentUser;
  if (user) {
    friendDAO.addRequest(userEmail, friendemail, friendname, sendResponse);
  } else {
    sendResponse({ message: 'No user logged in' });
  }
};

export const addFriend = (userEmail, friendemail, friendname, sendResponse) => {
  let user = firebase.auth().currentUser;
  if (user) {
    friendDAO.addFriend(userEmail, friendemail, friendname, sendResponse);
  } else {
    sendResponse({ message: 'No user logged in' });
  }
};

export const deleteFriend = (
  userEmail,
  friendemail,
  friendname,
  sendResponse
) => {
  let user = firebase.auth().currentUser;
  if (user) {
    friendDAO.deleteFriend(userEmail, friendemail, friendname, sendResponse);
  } else {
    sendResponse({ message: 'No user logged in' });
  }
};

export const deleteRequest = (
  userEmail,
  friendemail,
  friendname,
  sendResponse
) => {
  let user = firebase.auth().currentUser;
  if (user) {
    friendDAO.deleteFriendRequest(
      userEmail,
      friendemail,
      friendname,
      sendResponse
    );
  } else {
    sendResponse({ message: 'No user logged in' });
  }
};

export const validateEmail = (email, sendResponse) => {
  friendDAO.validateEmail(email, sendResponse);
};

export const acceptRequest = (email, name, sendResponse) => {
  let user = firebase.auth().currentUser;
  if (user) {
    friendDAO.acceptRequest(user, email, name, sendResponse);
  }
};
