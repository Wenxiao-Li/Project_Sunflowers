import { localBlockList, localAllowList } from '../modules/websiteLists';

const extractHost = (url) => {
  return new URL(url).hostname;
};

const matchURLHost = (first, second) => {
  var firstHost = extractHost(first);
  var secondHost = extractHost(second);
  return firstHost === secondHost;
};

const shouldBlock = (tab, isBlocklist) => {
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
      console.log('block value: ', block);
      let sendStatus = 0;
      if (block === true) {
        console.log('enter block');
        sendStatus = status;
      }
      console.log(status, ': ', sendStatus);
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
            console.log('content script does not exist');
          }
        }
      );
    });
  });
};
