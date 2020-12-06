import firebase, { db } from '../../../Background/modules/firebaseconfig';

function addFriend(friendemail, friendname) {
    var user = firebase.auth().currentUser;
    var useremail;
    if (user != null) {
        useremail = user.email;
    }

    chrome.runtime.sendMessage({ command: "add_friend", useremail: useremail, friendemail: friendemail, friendname: friendname }, (response) => {
        if (response.message === "success") {
            console.log("Add friend");
        }
    });

}

function deleteFriend(friendemail, friendname) {
    var user = firebase.auth().currentUser;
    var useremail;
    if (user != null) {
        useremail = user.email;
    }
    chrome.runtime.sendMessage({ command: "delete_friend", useremail: useremail, friendemail: friendemail, friendname: friendname }, (response) => {
        if (response.message === "success") {
            console.log("Delete friend");
        }
    });
}

function viewFriendlist() {
    var user = firebase.auth().currentUser;
    var email;
    var friendemail;

    if (user != null) {
        email = user.email;
    }
    chrome.runtime.sendMessage({ command: "view_friend", useremail: email }, (response) => {
        if (response.message === "success") {
            friendemail = response.friend;
        }
    });
    return friendemail;
}

export const addFriendHandle = (friend, name) => {
    addFriend(friend, name);
};

/*
export const viewFriendlistHandle = () => {
    return viewFriendlist();
};
*/
//TODO: js for view friends and delete friends. I want to test correctness of add friends first, then implement these functions.

export const deleteFriendHandle = (friend, name) => {
    deleteFriend(friend, name);
};

export function viewFriendlistHandle(callback) {
    var user = firebase.auth().currentUser;
    var email;
    var friendlist;
    var friendname = [];
    if (user != null) {
        email = user.email;
    }

    chrome.runtime.sendMessage(
        { command: 'view_friend', useremail: email },
        (response) => {
            if (response.message === 'success') {
                friendlist = response.friend;
                callback(friendlist);
            }
        }
    );
}

export function ViewNameHandle(email, callback) {
    chrome.runtime.sendMessage({ command: "view_owner", email: email }, (response1) => {
        return callback(response1.name);
    });
}
