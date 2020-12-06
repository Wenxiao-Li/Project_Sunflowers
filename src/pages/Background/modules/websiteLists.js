export let localBlockList = [];
export let localAllowList = [];

export const updateLocalLists = (snapshot) => {
  localBlockList = snapshot.data().blacklist;
  localAllowList = snapshot.data().whitelist;

  var i;
  for (i = 0; i < localBlockList.length; i++) {
    localBlockList[i] += '/*';
  }
  for (i = 0; i < localAllowList.length; i++) {
    localAllowList[i] += '/*';
  }
};
