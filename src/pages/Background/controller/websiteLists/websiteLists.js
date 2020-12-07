export let localBlockList = [];
export let localAllowList = [];

export const defaultBlocklist = ['https://www.youtube.com'];
export const defaultAllowlist = ['https://www.google.com'];

export const updateLocalLists = (snapshot) => {
  localBlockList = snapshot.data().blocklist;
  localAllowList = snapshot.data().allowlist;
};
