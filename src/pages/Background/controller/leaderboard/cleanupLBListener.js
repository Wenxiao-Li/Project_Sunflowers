import { endListenLBUpdates } from './leaderboardListenerManager';

export function cleanupLBListener() {
  var interval = setInterval(checkPopupOpen, 5000);

  function checkPopupOpen() {
    var views = chrome.extension.getViews({ type: 'popup' });
    if (views.length === 0) {
      endListenLBUpdates();
      console.log('popup closed');
      clearInterval(interval);
    }
  }
}
