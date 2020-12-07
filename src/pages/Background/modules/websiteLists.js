export let localBlockList = [];
export let localAllowList = [];

export const updateLocalLists = (snapshot) => {
  localBlockList = snapshot.data().blocklist;
  localAllowList = snapshot.data().allowlist;
};
