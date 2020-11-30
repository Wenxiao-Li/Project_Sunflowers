import React, { Component } from 'react';
import SunflowerBg from '../../../../assets/img/IMG_1277.jpg';

class Leaderboard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    console.log(this.props.friendsScore)
    var email = 'undefined';
    var userName = 'undefined';
    if (this.props.user) {
      email = this.props.user.email;
      userName = this.props.user.displayName;
    }
    var leaderboardRendered = this.props.friendsScore.map(
      friend => <div key={friend.userName}>{friend.userName}, Sunflowers = {friend.score}<br /></div>
    )
    return (
      <div>
        <h1> Leaderboard</h1>
        <p> {leaderboardRendered} </p>
        <span>User Name: {userName}</span>
        <br />
        <span>Email: {email}</span>
      </div>
    );
  }
}

export default Leaderboard;
