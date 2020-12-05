import React, { Component } from 'react';
import likedicon from '../../../../assets/img/liked.png';
import unlikedicon from '../../../../assets/img/unliked.png';
import { AuthContext } from '../../../../auth/Auth';
import { getLeaderboard, unsubscribe } from './getLeaderboard';
// A leaderboard entry consists of userName, score, and reactions. (Child of Leaderboard)
class LeaderBoardComponent {
  constructor(userName, score, reactions, currentUser) {
    this.userName = userName;
    this.score = score;
    this.reactions = reactions;
    this.currentUser = currentUser;
  }

  updateReactions() {
    console.log(this.reactions);
    if (this.reactions.indexOf(this.currentUser) === -1) {
      this.reactions.push(this.currentUser);
    } else {
      this.reactions.pop(this.currentUser);
    }
  }
}

const Leaderboard = () => {
  const [leaderBoardComponents, setLBComponents] = React.useState([]);

  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {

    const setArray = (inputArray) => {
      var currentFriendsScoreArray = [];
      currentFriendsScoreArray = inputArray;
      currentFriendsScoreArray.sort((a, b) => b.score - a.score);

      var newLeaderBoardComponents = [];
      for (var i = 0; i < currentFriendsScoreArray.length; i++) {
        var current = currentFriendsScoreArray[i];
        console.log('print: ', current);
        var leaderBoardComponent = new LeaderBoardComponent(
          current.userName,
          current.score,
          [],
          user.displayName
        );
        newLeaderBoardComponents.push(leaderBoardComponent);
      }
      setLBComponents(newLeaderBoardComponents);
    };
    getLeaderboard(user, setArray);

    return unsubscribe;
  }, []);

  const updateLeaderBoard = (name) => {
    var nameReactedTo = name;
    console.log(nameReactedTo);
    var copy = leaderBoardComponents.slice();
    for (var i = 0; i < copy.length; i++) {
      if (copy[i].userName === nameReactedTo) {
        if (copy[i].reactions.indexOf(copy[i].currentUser) === -1) {
          console.log('Reaction added for user', nameReactedTo);
          copy[i].reactions.push(copy[i].currentUser);
        } else {
          console.log('Reaction removed for user', nameReactedTo);
          copy[i].reactions.pop(copy[i].currentUser);
        }
      }
    }
    setLBComponents(copy);
  };
  var email = 'undefined';
  var userName = 'undefined';
  if (user) {
    email = user.email;
    userName = user.displayName;
  }

  var leaderboardRendered = leaderBoardComponents.map((friend) => (
    <div key={friend.userName}>
      {friend.userName} Sunflowers = {friend.score}
      <button
        id={friend.userName}
        onClick={() => updateLeaderBoard(friend.userName)}
      >
        <img
          src={
            friend.reactions.indexOf(userName) === -1 ? unlikedicon : likedicon
          }
          style={{ width: 20, height: 20 }}
        ></img>
      </button>
      {friend.reactions.length}
    </div>
  ));

  return (
    <div>
      <h1> Leaderboard</h1>
      {leaderboardRendered}
      <span>User Name: {userName}</span>
      <br />
      <span>Email: {email}</span>
    </div>
  );
};

export default Leaderboard;
