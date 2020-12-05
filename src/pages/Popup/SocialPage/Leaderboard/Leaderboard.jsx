import React, { Component } from 'react';
import likedicon from '../../../../assets/img/liked.png';
import unlikedicon from '../../../../assets/img/unliked.png';
import { AuthContext } from '../../../../auth/Auth';
import sunflowerIcon from "../../../../assets/img/sunflowerIcon.jpg";
import "./Leaderboard.css"

// A leaderboard entry consists of userName, score, and reactions. (Child of Leaderboard)
class LeaderBoardComponent {
  constructor(userName, email, score, reactions, currentUser) {
    this.userName = userName;
    this.email = email;
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

  var currentFriendsScoreArray = [
    {
      email: 'hello@world.com',
      score: 12,
      reactions: {
        0x1F603: [
          'sagupta@ucsd.edu',
          'yitian@wang.com',
        ],
        0x1F525: [
          'sagupta@ucsd.edu',
        ],
        0x1F495: [
          'hello@world.com',
          'sagupta@ucsd.edu',
        ]
      },
    },
  ];

  React.useEffect(() => {
    //Sort the array returned.
    currentFriendsScoreArray.sort((a, b) => b.score - a.score);

    var newLeaderBoardComponents = [];
    for (var i = 0; i < currentFriendsScoreArray.length; i++) {
      var current = currentFriendsScoreArray[i];
      var leaderBoardComponent = new LeaderBoardComponent(
        current.email,
        current.email,
        current.score,
        current.reactions,
        user.email,
      );
      newLeaderBoardComponents.push(leaderBoardComponent);
    }
    setLBComponents(newLeaderBoardComponents);
  }, []);

  const updateLeaderBoard = (friendReactedTo, keyReactedOn) => {
    console.log("Friend Reacted to ", friendReactedTo);
    console.log("Emoji Reacted on", keyReactedOn);
    var copy = [...leaderBoardComponents];
    var indexOffriend = copy.findIndex(friend => friend.email === friendReactedTo);
    var reactionExists = copy[indexOffriend].reactions[keyReactedOn].indexOf(user.email);
    if (reactionExists === -1) {
      copy[indexOffriend].reactions[keyReactedOn].push(user.email);
    } else {
      copy[indexOffriend].reactions[keyReactedOn].splice(reactionExists, 1);
    }
    console.log(copy);
    console.log(leaderBoardComponents);
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
      {friend.userName}
      {" " + friend.score + "x"}
      <img className="sunflower-icon" src={sunflowerIcon}>
      </img>
      {
        Object.entries(friend.reactions).map(([key, arrayOfReacts]) => (
          <button key={key} value={friend.email} class={arrayOfReacts.indexOf(user.email) == -1 ? "unreacted" : "reacted"} onClick={e => updateLeaderBoard(e.target.value, key)}>
            {String.fromCodePoint(key)} {arrayOfReacts.length}
          </button>
        ))
      }
    </div >
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
