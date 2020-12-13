import firebase from '../../../Background/modules/firebaseconfig';

function addFriend(friendemail, friendname) {
  var user = firebase.auth().currentUser;
  var useremail;
  if (!user) {
    useremail = user.email;
    chrome.runtime.sendMessage(
      {
        msg: 'add_friend',
        useremail: useremail,
        friendemail: friendemail,
        friendname: friendname,
      },
      (response) => {
        if (response.message === 'success') {
          console.log('Add friend to self');
        }
      }
    );
  }
}

function deleteFriend(friendemail, friendname) {
  var user = firebase.auth().currentUser;
  var useremail;
  if (user != null) {
    useremail = user.email;
  }
  chrome.runtime.sendMessage(
    {
      msg: 'delete_friend',
      useremail: useremail,
      friendemail: friendemail,
      friendname: friendname,
    },
    (response) => {
      if (response.message === 'success') {
        console.log('Delete friend');
      }
    }
  );
}

function deleteFriendMutual(useremail) {
  var user = firebase.auth().currentUser;
  if (user != null) {
    var friendemail = user.email;
    var friendname = user.displayName;
  }
  chrome.runtime.sendMessage(
    {
      msg: 'delete_friend',
      useremail: useremail,
      friendemail: friendemail,
      friendname: friendname,
    },
    (response) => {
      if (response.message === 'success') {
        console.log('Delete friend');
      }
    }
  );
}

function addRequest(useremail) {
  var user = firebase.auth().currentUser;
  var friendname;
  var friendemail;

  if (user != null) {
    friendemail = user.email;
    friendname = user.displayName;
  }
  chrome.runtime.sendMessage(
    {
      msg: 'add_request',
      useremail: useremail,
      friendemail: friendemail,
      friendname: friendname,
    },
    (response) => {
      if (response.message === 'success') {
        console.log('Add request');
      }
    }
  );
}

export const addFriendHandle = (friend, name) => {
  addFriend(friend, name);
};

export const friendRequestHandle = (useremail) => {
  addRequest(useremail);
};

//TODO: js for view friends and delete friends. I want to test correctness of add friends first, then implement these functions.

export const deleteFriendHandle = (friend, name) => {
  deleteFriend(friend, name);
};

export const deleteFriendMutualHandle = (useremail) => {
  deleteFriendMutual(useremail);
};

export function ViewNameHandle(email, callback) {
  chrome.runtime.sendMessage(
    { msg: 'view_owner', email: email },
    (response) => {
      callback();
    }
  );
}
