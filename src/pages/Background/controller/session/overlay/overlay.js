import { getUserSnapshot } from '../../usersnapshot/user';

const extractHost = (url) => {
  var hostString = new URL(url).hostname;
  // var firstDotIndex = hostString.indexOf('.');
  // var lastDotIndex = hostString.lastIndexOf('.');

  // if (firstDotIndex !== lastDotIndex) {
  //   return hostString.substring(firstDotIndex + 1);
  // }
  return hostString;
};

const matchURLHost = (first, second) => {
  var firstHost = extractHost(first);
  var secondHost = extractHost(second);
  return firstHost === secondHost;
};

const shouldBlock = (tab, isBlocklist) => {
  let localBlockList = [];
  let localAllowList = [];
  let userSnapshot = getUserSnapshot();
  if (userSnapshot) {
    localAllowList = userSnapshot.data().allowlist;
    localBlockList = userSnapshot.data().blocklist;
  }
  if (isBlocklist) {
    for (var i = 0; i < localBlockList.length; i++) {
      if (matchURLHost(tab.url, localBlockList[i])) {
        return true;
      }
    }
    return false;
  } else {
    for (var i = 0; i < localAllowList.length; i++) {
      if (matchURLHost(tab.url, localAllowList[i])) {
        return false;
      }
    }
    return true;
  }
};

export const controlOverlay = (minutes, seconds, status, isBlocklist) => {
  // broadcasting to every tab to update the session info
  // TODO add avoiding non-web tabs
  const updateDisplayedTimeMsg = 'update-time';
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(function (tab) {
      let block = shouldBlock(tab, isBlocklist);
      let sendStatus = 0;
      if (block === true) {
        sendStatus = status;
      }
      chrome.tabs.sendMessage(
        tab.id,
        {
          msg: updateDisplayedTimeMsg,
          data: {
            minutes: minutes,
            seconds: seconds,
            status: sendStatus,
          },
        },
        () => {
          if (chrome.runtime.lastError) {
          }
        }
      );
    });
  });
};
