import React, { Component } from 'react';
import SunflowerBg from '../../../../assets/img/IMG_1277.jpg';

class SessionHistory extends Component {
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
    var email = 'undefined';
    var userName = 'undefined';
    if (this.props.user) {
      email = this.props.user.email;
      userName = this.props.user.displayName;
    }
    return (
      <div>
        <img src={SunflowerBg} />
        <h1 id="page-name">You are signed in</h1>
        <h3> Session History</h3>
        <span>User Name: {userName}</span>
        <br />
        <span>Email: {email}</span>
        <br />
        <button onClick={() => this.props.toProfile()}> Back </button>
      </div>
    );
  }
}

export default SessionHistory;
