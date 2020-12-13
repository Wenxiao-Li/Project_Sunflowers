export const viewHistory = (user) => {
  chrome.runtime.sendMessage(
    { msg: 'view_history', user: user },
    (response) => {
      var lastError = chrome.runtime.lastError;
      if (lastError) {
        console.log(lastError.message);
        return;
      }
      if (response.message === 'success') {
        console.log('view_history');
      }
    }
  );
};
