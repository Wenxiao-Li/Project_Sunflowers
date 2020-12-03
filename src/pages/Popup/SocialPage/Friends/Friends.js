import firebase, { db } from '../../../Background/modules/firebaseconfig';

function addFriend(friend) {
    let friendemail = friend;
    var user = firebase.auth().currentUser;
    var useremail;
    if (user != null) {
        useremail = user.email;
    }
    chrome.runtime.sendMessage({ command: "add_friend", useremail: useremail, friendemail: friendemail }, (response) => {
        if (response.message === "success") {
            console.log("Add friend");
        }
    });
}

function deleteFriend(friend) {
    let friendemail = friend;
    var user = firebase.auth().currentUser;
    var useremail;
    if (user != null) {
        useremail = user.email;
    }
    chrome.runtime.sendMessage({ command: "delete_friend", useremail: useremail, friendemail: friendemail }, (response) => {
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
    })
    return friendemail;
}

export const addFriendHandle = (friend) => {
    addFriend(friend);
};

/*
export const viewFriendlistHandle = () => {
    return viewFriendlist();
};
*/
//TODO: js for view friends and delete friends. I want to test correctness of add friends first, then implement these functions.

export const deleteFriendHandle = (friend) => {
    deleteFriend(friend);
};

export function viewFriendlistHandle(callback) {
    var user = firebase.auth().currentUser;
    var email;
    var friendlist;
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
