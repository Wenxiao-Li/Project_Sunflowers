import firebase from '../modules/firebaseconfig';
import * as listsDAO from './websiteListsDAO';

export const getAllLists = (callback) => {
  let user = firebase.auth().currentUser;
  if (user) {
    listsDAO.getAllLists(user.email).then((listArr) => {
      callback(listArr);
    });
  }
};
