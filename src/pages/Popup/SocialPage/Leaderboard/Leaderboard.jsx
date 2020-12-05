import React, { Component } from 'react';
import likedicon from '../../../../assets/img/liked.png';
import unlikedicon from '../../../../assets/img/unliked.png';
import { AuthContext } from '../../../../auth/Auth';
// A leaderboard entry consists of userName, score, and reactions. (Child of Leaderboard)
class LeaderBoardComponent {
  constructor(userName, score, reactions, currentUser) {
    this.userName = userName;
    this.score = score;
    this.reactions = reactions;
    this.currentUser = currentUser;
  }

  updateReactions() {
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
    var currentFriendsScoreArray = [
      {
        userName: 'Satyam Gupta',
        score: 12,
        reactions: ['Yitian', 'HaiHao', 'Satyam Gupta'],
      },
      {
        userName: 'Yitian Wang',
        score: 20,
        reactions: [],
      },
      {
        userName: 'HaiHao Sun',
        score: 30,
        reactions: [],
      },
      {
        userName: 'Fei Dai',
        score: 40,
        reactions: [],
      },
    ];
    //Sort the array returned.
    currentFriendsScoreArray.sort((a, b) => b.score - a.score);

    var newLeaderBoardComponents = [];
    for (var i = 0; i < currentFriendsScoreArray.length; i++) {
      var current = currentFriendsScoreArray[i];
      var leaderBoardComponent = new LeaderBoardComponent(
        current.userName,
        current.score,
        current.reactions,
        user.displayName
      );
      newLeaderBoardComponents.push(leaderBoardComponent);
    }
    setLBComponents(newLeaderBoardComponents);
  }, []);

  const updateLeaderBoard = (name) => {
    var nameReactedTo = name;
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
