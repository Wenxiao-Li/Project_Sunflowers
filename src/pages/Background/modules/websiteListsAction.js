import { getAllLists } from '../model/websiteListsDispatch';

export const getWebsitesAction = (request, sender, sendResponse, callback) => {
  getAllLists(callback);
};
