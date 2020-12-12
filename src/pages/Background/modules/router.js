let router = [];

export function routerInclude(pairArr) {
  router = router.concat(pairArr);
}

// This method would take an actionArr and convert it into an chrome Listener function
const pairArrToListenerFunc = (actionPairArr) => {
  return function (request, sender, sendResponse) {
    actionPairArr.forEach((actionPair) => {
      if (request.msg === actionPair.msg) {
        actionPair.action(request, sender, sendResponse);
        return true;
      }
    });
  };
};

export const runMessageRouter = () => {
  chrome.runtime.onMessage.addListener(pairArrToListenerFunc(router));
};
