import { getWebsitesAction } from '../modules/websiteListsAction';

const getWebsitesPair = {
  msg: 'view_website',
  action: getWebsitesAction,
  callback: (listArr) => {
    console.log(listArr);
  },
};

export let websiteListsArr = [getWebsitesPair];
