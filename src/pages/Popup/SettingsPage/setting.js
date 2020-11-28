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

function addBlockList(blockList) {
  let bl = blockList;
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
        console.log('Add blockList');
      }
    }
  );
}

function addAllowList(allowList) {
  let wl = allowList;
  var user = firebase.auth().currentUser;
  var email;
  if (user != null) {
    email = user.email;
  }
  chrome.runtime.sendMessage(
    { command: 'add_whitelist', whitelist: wl, useremail: email },
    (response) => {
      if (response.message === 'success') {
        //window.location.replace('./popup.html');
        console.log('Add allowList');
      }
    }
  );
}

function viewWebsitelist() {
  var user = firebase.auth().currentUser;
  var email;
  var blockList, allowList;
  if (user != null) {
    email = user.email;
  }
  chrome.runtime.sendMessage(
    { command: 'view_website', useremail: email },
    (response) => {
      if (response.message === 'success') {
        blockList = response.bl;
        allowList = response.wl;
      }
    }
  );
  return blockList, allowList;
}

export const changeUsernameHandle = (firstname, lastname) => {
  changeUsername(firstname, lastname);
};

export const addBlockListHandle = (blockList) => {
  addBlockList(blockList);
};

export const addAllowListHandle = (allowList) => {
  addAllowList(allowList);
};

export const viewWebsitelistHandle = () => {
  return viewWebsitelist();
};
