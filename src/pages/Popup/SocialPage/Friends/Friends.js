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

function viewFriendslist() {
    var user = firebase.auth().currentUser;
    var email;
    var friendname;
    if (user != null) {
        email = user.email;
    }
    chrome.runtime.sendMessage({ command: "view_friends", useremail: email }, (response) => {
        if (response.message === "success") {
            friendname = response.friend;
        }
    })
    return friendname;
}

export const addFriendHandle = (friend) => {
    addFriend(friend);
    console.log("Add friend");
};


export const viewFriendslistHandle = () => {
    return viewFriendslist();
};

//TODO: js for view friends and delete friends. I want to test correctness of add friends first, then implement these functions.