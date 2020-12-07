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

export function addBlocklist(blocklist, callback) {
  let bl = blocklist;
  var user = firebase.auth().currentUser;
  var email;
  if (user != null) {
    email = user.email;
  }
  chrome.runtime.sendMessage(
    { command: 'add_blocklist', blocklist: bl, useremail: email },
    (response) => {
      var lastError = chrome.runtime.lastError;
      if (lastError) {
        console.log(lastError.message);
        return;
      }
      if (response.message === 'success') {
        //window.location.replace('./popup.html');
        console.log('Add blocklist');
        callback();
      }
    }
  );
}

export function addAllowlist(allowlist, callback) {
  let al = allowlist;
  console.log('al', al);
  var user = firebase.auth().currentUser;
  var email;
  if (user != null) {
    email = user.email;
  }
  chrome.runtime.sendMessage(
    { command: 'add_allowlist', allowlist: al, useremail: email },
    (response) => {
      var lastError = chrome.runtime.lastError;
      if (lastError) {
        console.log(lastError.message);
        return;
      }
      if (response.message === 'success') {
        console.log('Add allowlist');
        callback();
      }
    }
  );
}

export function deleteBlocklist(blocklist, callback) {
  let bl = blocklist;
  var user = firebase.auth().currentUser;
  var email;
  if (user != null) {
    email = user.email;
  }
  chrome.runtime.sendMessage(
    { command: 'delete_blocklist', blocklist: bl, useremail: email },
    (response) => {
      var lastError = chrome.runtime.lastError;
      if (lastError) {
        console.log(lastError.message);
        return;
      }
      if (response.message === 'success') {
        //window.location.replace('./popup.html');
        console.log('Delete blocklist');
        callback();
      }
    }
  );
}

export function deleteAllowlist(allowlist, callback) {
  let al = allowlist;
  console.log('al', al);
  var user = firebase.auth().currentUser;
  var email;
  if (user != null) {
    email = user.email;
  }
  chrome.runtime.sendMessage(
    { command: 'delete_allowlist', allowlist: al, useremail: email },
    (response) => {
      var lastError = chrome.runtime.lastError;
      if (lastError) {
        console.log(lastError.message);
        return;
      }
      if (response.message === 'success') {
        console.log('Delete allowlist');
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
        allowlist = response.al;
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
