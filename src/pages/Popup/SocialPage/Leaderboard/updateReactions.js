function updateReactions(user, friendReactedTo, reactionExists, keyReactedOn) {
  if (user != null) {
    chrome.runtime.sendMessage(
      {
        msg: 'update_Reaction',
        user: user,
        friendReactedTo: friendReactedTo,
        reactionExists: reactionExists,
        keyReactedOn: keyReactedOn,

      },
      (response) => {
        if (response.message === 'success') {
          console.log('Update reaction');
        }
      }
    );
  }
}

export const updateReactionHandle = (user, friendReactedTo,
  reactionExists, keyReactedOn) => {
  updateReactions(user, friendReactedTo, reactionExists, keyReactedOn);
}
