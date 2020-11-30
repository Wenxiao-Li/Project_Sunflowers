import firebase, { db } from '../../Background/modules/firebaseconfig';

function changeUsername(firstname, lastname) {
  let fn = firstname;
  let ln = lastname;
  var user = firebase.auth().currentUser;
  var email;
  if (user != null) {
    email = user.email;
  }
  chrome.runtime.sendMessage(
    { command: 'set_name', firstname: fn, lastname: ln, useremail: email },
    (response) => {
      if (response.message === 'success') {
        //window.location.replace('./popup.html');
        console.log('Set name');
      }
    }
  );
}

function addBlacklist(blacklist) {
  let bl = blacklist;
  var user = firebase.auth().currentUser;
  var email;
  if (user != null) {
    email = user.email;
  }
  chrome.runtime.sendMessage(
    { command: 'add_blacklist', blacklist: bl, useremail: email },
    (response) => {
      if (response.message === 'success') {
        //window.location.replace('./popup.html');
        console.log('Add blacklist');
      }
    }
  );
}

function addWhitelist(whitelist) {
  let wl = whitelist;
  console.log('wl', wl);
  var user = firebase.auth().currentUser;
  var email;
  if (user != null) {
    email = user.email;
  }
  chrome.runtime.sendMessage(
    { command: 'add_whitelist', whitelist: wl, useremail: email },
    (response) => {
      if (response.message === 'success') {
        console.log('Add whitelist');
      }
    }
  );
}

export function viewWebsitelistHandle(callback) {
  var user = firebase.auth().currentUser;
  var email;
  var blacklist, whitelist;
  if (user != null) {
    email = user.email;
  }

  console.log('I got: ', email);
  chrome.runtime.sendMessage(
    { command: 'view_website', useremail: email },
    (response) => {
      if (response.message === 'success') {
        blacklist = response.bl;
        whitelist = response.wl;
        callback(blacklist, whitelist);
        console.log('succeeded');
      } else if (response.message === 'failure') {
        console.log('failed');
      }
    }
  );
}

export const changeUsernameHandle = (firstname, lastname) => {
  changeUsername(firstname, lastname);
};

export const addBlacklistHandle = (blacklist) => {
  addBlacklist(blacklist);
};

export const addWhitelistHandle = (whitelist) => {
  addWhitelist(whitelist);
};
