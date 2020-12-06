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
      var lastError = chrome.runtime.lastError;
      if (lastError) {
        console.log(lastError.message);
        return;
      }
      if (response.message === 'success') {
        //window.location.replace('./popup.html');
        console.log('Set name');
      }
    }
  );
}

export function addBlacklist(blacklist, callback) {
  let bl = blacklist;
  var user = firebase.auth().currentUser;
  var email;
  if (user != null) {
    email = user.email;
  }
  chrome.runtime.sendMessage(
    { command: 'add_blacklist', blacklist: bl, useremail: email },
    (response) => {
      var lastError = chrome.runtime.lastError;
      if (lastError) {
        console.log(lastError.message);
        return;
      }
      if (response.message === 'success') {
        //window.location.replace('./popup.html');
        console.log('Add blacklist');
        callback();
      }
    }
  );
}

export function addWhitelist(whitelist, callback) {
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
      var lastError = chrome.runtime.lastError;
      if (lastError) {
        console.log(lastError.message);
        return;
      }
      if (response.message === 'success') {
        console.log('Add whitelist');
        callback();
      }
    }
  );
}

export function deleteBlacklist(blacklist, callback) {
  let bl = blacklist;
  var user = firebase.auth().currentUser;
  var email;
  if (user != null) {
    email = user.email;
  }
  chrome.runtime.sendMessage(
    { command: 'delete_blacklist', blacklist: bl, useremail: email },
    (response) => {
      var lastError = chrome.runtime.lastError;
      if (lastError) {
        console.log(lastError.message);
        return;
      }
      if (response.message === 'success') {
        //window.location.replace('./popup.html');
        console.log('Delete blacklist');
        callback();
      }
    }
  );
}

export function deleteWhitelist(whitelist, callback) {
  let wl = whitelist;
  console.log('wl', wl);
  var user = firebase.auth().currentUser;
  var email;
  if (user != null) {
    email = user.email;
  }
  chrome.runtime.sendMessage(
    { command: 'delete_whitelist', whitelist: wl, useremail: email },
    (response) => {
      var lastError = chrome.runtime.lastError;
      if (lastError) {
        console.log(lastError.message);
        return;
      }
      if (response.message === 'success') {
        console.log('Delete whitelist');
        callback();
      }
    }
  );
}

export function viewWebsitelistHandle(callback) {
  var user = firebase.auth().currentUser;
  var email;
  var blocklist, allowlist;
  if (user != null) {
    email = user.email;
  }

  console.log('I got: ', email);
  chrome.runtime.sendMessage(
    { msg: 'view_website', command: 'view_website', useremail: email },
    (response) => {
      var lastError = chrome.runtime.lastError;
      if (lastError) {
        console.log(lastError.message);
        return;
      }
      // This is bad when you switch to other tabs before callback is called
      if (response.message === 'success') {
        blocklist = response.bl;
        allowlist = response.wl;
        callback(blocklist, allowlist);
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
