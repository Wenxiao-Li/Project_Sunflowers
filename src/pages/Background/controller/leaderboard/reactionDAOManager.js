import * as reactionDAO from '../../model/reactionDAO';


export const updateReactions = (user,
    friendReactedTo,
    reactionExists,
    keyReactedOn,
    sendResponse
) => {
    if (user) {
        reactionDAO.updateReactions(user,
            friendReactedTo,
            reactionExists,
            keyReactedOn,
            sendResponse);
        sendResponse({ message: 'success' });
    } else {
        sendResponse({ message: 'No user logged in' });
    }
};