export const insertScript = (tabId) => {
  chrome.tabs.sendMessage(tabId, { msg: 'are-you-there-content?' }, function (
    response
  ) {
    if (chrome.runtime.lastError) {
      console.log('caught error checking duplicate');
    }
    response = response || {};
    if (response.status != 'yes') {
      chrome.tabs.executeScript(
        tabId,
        {
          file: 'contentScript.bundle.js',
        },
        () => {
          if (chrome.runtime.lastError) {
            console.log('caught runtime error');
          }
        }
      );
    } else {
      console.log('yes');
    }
  });
};

export const injectToActiveTab = () => {
  // Will execute when tab is switched, this will not gurantee insertion in already active tabs
  chrome.tabs.onActivated.addListener(function (activeInfo) {
    // for the current tab, inject the "inject.js" file & execute it
    const tabId = activeInfo.tabId;
    insertScript(tabId);
  });

  // Fires when create or reload a new tab, won't activate when switching tabs
  chrome.webNavigation.onCommitted.addListener((details) => {
    const tabId = details.tabId;
    insertScript(tabId);
  });
};

export const injectToCurrentTabs = () => {
  // insert scripts to all tabs (active tabs)
  chrome.tabs.query({ active: true, url: ['https://*/*'] }, function (tabs) {
    tabs.forEach(function (tab) {
      const tabId = tab.id;
      insertScript(tabId);
    });
  });
};
