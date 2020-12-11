import { endListenUserUpdates } from './userListenerHandle';

export function cleanupUserListener() {
  var interval = setInterval(checkPopupOpen, 5000);

  function checkPopupOpen() {
    var views = chrome.extension.getViews({ type: 'popup' });
    if (views.length === 0) {
      endListenUserUpdates();
      console.log('popup closed');
      clearInterval(interval);
    }
  }
}
