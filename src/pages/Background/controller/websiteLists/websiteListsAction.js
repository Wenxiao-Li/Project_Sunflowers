import { getAllLists } from '../../model/websiteListsDispatch';

export const getWebsitesAction = (request, sender, sendResponse) => {
  getAllLists((listArr) => {
    console.log(listArr);
  });
};
