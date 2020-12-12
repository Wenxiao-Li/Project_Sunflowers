import { updateReactions } from './reactionDAOManager';

export const updateReactionsAction = (request, sender, sendResponse) => {
    updateReactions(
        request.user,
        request.friendReactedTo,
        request.reactionExists,
        request.keyReactedOn,
        sendResponse
    );
};