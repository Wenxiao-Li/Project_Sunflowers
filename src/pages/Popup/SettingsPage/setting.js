export function addBlocklist(user, blocklist) {
  let bl = blocklist;
  var email;
  if (user) {
    email = user.email;

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
        }
      }
    );
  }
}

export function addAllowlist(user, allowlist) {
  let al = allowlist;
  console.log('al', al);
  var email;
  if (user) {
    email = user.email;

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
        }
      }
    );
  }
}

export function deleteBlocklist(user, blocklist) {
  let bl = blocklist;
  var email;
  if (user) {
    email = user.email;

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
        }
      }
    );
  }
}

export function deleteAllowlist(user, allowlist) {
  let al = allowlist;
  console.log('al', al);
  var email;
  if (user) {
    email = user.email;

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
        }
      }
    );
  }
}
