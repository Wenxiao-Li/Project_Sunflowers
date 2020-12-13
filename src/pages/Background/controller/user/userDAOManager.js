import firebase from '../../modules/firebaseconfig';
import * as userflowerDAO from '../../model/userDAO';

export const incrementFlower = (number) => {
  let user = firebase.auth().currentUser;
  if (user) {
    userflowerDAO.incrementFlower(user.email, number);
  } else {
    console.log('No user logged in');
  }
};

export const addBlocklist = (blockList, sendResponse) => {
  let user = firebase.auth().currentUser;
  if (user) {
    userflowerDAO.addBlocklist(user.email, blockList, sendResponse);
  } else {
    sendResponse({ message: 'No user logged in' });
  }
};

export const addAllowlist = (allowList, sendResponse) => {
  let user = firebase.auth().currentUser;
  if (user) {
    userflowerDAO.addAllowlist(user.email, allowList, sendResponse);
  } else {
    sendResponse({ message: 'No user logged in' });
  }
};

export const deleteBlocklist = (blockList, sendResponse) => {
  let user = firebase.auth().currentUser;
  if (user) {
    userflowerDAO.deleteBlocklist(user.email, blockList, sendResponse);
  } else {
    sendResponse({ message: 'No user logged in' });
  }
};

export const deleteAllowlist = (allowList, sendResponse) => {
  let user = firebase.auth().currentUser;
  if (user) {
    userflowerDAO.deleteAllowlist(user.email, allowList, sendResponse);
  } else {
    sendResponse({ message: 'No user logged in' });
  }
};
