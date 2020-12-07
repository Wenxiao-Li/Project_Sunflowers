import firebase, { db } from '../../../Background/modules/firebaseconfig';

export function viewFriendRequestHandle(callback) {
    var user = firebase.auth().currentUser;
    var email;
    var friendlist;
    if (user != null) {
        email = user.email;
    }

    chrome.runtime.sendMessage(
        { command: 'view_friend2', useremail: email },
        (response) => {
            if (response.message === 'success') {
                friendlist = response.friend;
                callback(friendlist);
            }
        }
    );
}

export const deleteFriend2Handle = (friend, name) => {
    deleteFriend2(friend, name);
};

function deleteFriend2(friendemail, friendname) {
    var user = firebase.auth().currentUser;
    var useremail;
    if (user != null) {
        useremail = user.email;
    }
    chrome.runtime.sendMessage({ command: "delete_friend2", useremail: useremail, friendemail: friendemail, friendname: friendname }, (response) => {
        if (response.message === "success") {
            console.log("Delete friend");
        }
    });
}

export const friendSuccessHandle = (useremail) => {
    requestSuccess(useremail);
};

function requestSuccess(useremail) {
    var user = firebase.auth().currentUser;
    var friendname;
    var friendemail;

    if (user != null) {
        friendemail = user.email
        friendname = user.displayName;
    }
    chrome.runtime.sendMessage({ command: "add_friend", useremail: useremail, friendemail: friendemail, friendname: friendname }, (response) => {
        if (response.message === "success") {
            console.log("Add friend");
        }
    });
}