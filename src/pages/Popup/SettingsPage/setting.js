export function addBlocklist(blocklist) {
  let bl = blocklist;

  chrome.runtime.sendMessage(
    { command: 'add_blocklist', blocklist: bl },
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

export function addAllowlist(allowlist) {
  let al = allowlist;
  console.log('al', al);

  chrome.runtime.sendMessage(
    { command: 'add_allowlist', allowlist: al },
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

export function deleteBlocklist(blocklist) {
  let bl = blocklist;

  chrome.runtime.sendMessage(
    { command: 'delete_blocklist', blocklist: bl },
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

export function deleteAllowlist(allowlist) {
  let al = allowlist;
  console.log('al', al);

  chrome.runtime.sendMessage(
    { command: 'delete_allowlist', allowlist: al },
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
