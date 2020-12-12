import firebase from '../../../Background/modules/firebaseconfig';
import { addFriendHandle, ViewNameHandle } from '../Friends/Friends.js';

export const deleteFriend2Handle = (friend, name, callback) => {
  deleteFriend2(friend, name, callback);
};

function deleteFriend2(friendemail, friendname, callback) {
  var user = firebase.auth().currentUser;
  var useremail;
  if (user != null) {
    useremail = user.email;
  }
  chrome.runtime.sendMessage(
    {
      msg: 'delete_request',
      useremail: useremail,
      friendemail: friendemail,
      friendname: friendname,
    },
    (response) => {
      callback();
      if (response.message === 'success') {
        console.log('Delete friend');
      } else {
        console.log(response.message);
      }
    }
  );
}

export const friendSuccessHandle = (useremail, callback) => {
  requestSuccess(useremail, callback);
};

function requestSuccess(useremail, callback) {
  var user = firebase.auth().currentUser;
  var friendname;
  var friendemail;

  if (!user) {
    friendemail = user.email;
    friendname = user.displayName;

    chrome.runtime.sendMessage(
      {
        msg: 'add_friend',
        useremail: useremail,
        friendemail: friendemail,
        friendname: friendname,
      },
      (response) => {
        callback();
        if (response.message === 'success') {
          console.log('Add friend to others');
        } else {
          console.log(response.message);
        }
      }
    );
  }
}

export const acceptFriendRequestHandle = (email, name) => {
  chrome.runtime.sendMessage({
    msg: 'accept_request',
    email: email,
    name: name,
  });
};
