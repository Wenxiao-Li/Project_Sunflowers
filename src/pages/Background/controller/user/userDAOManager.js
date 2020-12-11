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

export const addBlocklist = (blockList, callback) => {
  let user = firebase.auth().currentUser;
  if (user) {
    userflowerDAO.addBlocklist(user.email, blockList, callback);
  } else {
    callback({ message: 'No user logged in' });
  }
};

export const addAllowlist = (allowList, callback) => {
  let user = firebase.auth().currentUser;
  if (user) {
    userflowerDAO.addAllowlist(user.email, allowList, callback);
  } else {
    callback({ message: 'No user logged in' });
  }
};

export const deleteBlocklist = (blockList, callback) => {
  let user = firebase.auth().currentUser;
  if (user) {
    userflowerDAO.deleteBlocklist(user.email, blockList, callback);
  } else {
    callback({ message: 'No user logged in' });
  }
};

export const deleteAllowlist = (allowList, callback) => {
  let user = firebase.auth().currentUser;
  if (user) {
    userflowerDAO.deleteAllowlist(user.email, allowList, callback);
  } else {
    callback({ message: 'No user logged in' });
  }
};
