import { updateReactions } from '../model/reactionDAO';
import { updateReactionsAction } from './leaderboard/reactionAction';

const updateReactionPair = {
    msg: 'update_Reaction',
    action: updateReactionsAction,
};

export const reactionRoutes = [updateReactionPair];