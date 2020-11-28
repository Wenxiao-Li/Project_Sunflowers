import firebase from '../../Background/modules/firebaseconfig';

function changeUsername(firstname, lastname) {
    let fn = firstname;
    let ln = lastname;
    var user = firebase.auth().currentUser;
    var email;
    if (user != null) {
        email = user.email;
    }
    chrome.runtime.sendMessage({ command: "set_name", firstname: fn, lastname: ln, useremail: email }, (response) => {
        if (response.message === "success") {
            //window.location.replace('./popup.html');
            console.log("Set name");
        }
    });
}

function changeBlacklist(blacklist) {
    let bl = blacklist;
    var user = firebase.auth().currentUser;
    var email;
    if (user != null) {
        email = user.email;
    }
    chrome.runtime.sendMessage({ command: "add_blacklist", blacklist: bl, useremail: email }, (response) => {
        if (response.message === "success") {
            //window.location.replace('./popup.html');
            console.log("Add blacklist");
        }
    });
}

function changeWhitelist(whitelist) {
    let wl = whitelist;
    var user = firebase.auth().currentUser;
    var email;
    if (user != null) {
        email = user.email;
    }
    chrome.runtime.sendMessage({ command: "add_whitelist", whitelist: wl, useremail: email }, (response) => {
        if (response.message === "success") {
            //window.location.replace('./popup.html');
            console.log("Add whitelist");
        }
    });
}

export const changeUsernameHandle = (firstname, lastname) => {
    console.log("Changing username")
    changeUsername(firstname, lastname);
};

export const addBlacklistHandle = (blacklist) => {
    changeBlacklist(blacklist);
};

export const addWhitelistHandle = (whitelist) => {
    changeWhitelist(whitelist);
};