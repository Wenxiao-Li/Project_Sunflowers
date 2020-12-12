import firebase from '../modules/firebaseconfig';
import * as userflowerDAO from './userflowerDAO';

export const incrementFlower = (number) => {
  let user = firebase.auth().currentUser;
  if (user) {
    userflowerDAO.incrementFlower(user.email, number);
  } else {
    console.log('No user logged in');
  }
};
