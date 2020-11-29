import React, { Component } from 'react';
import SunflowerBg from '../../../../assets/img/IMG_1277.jpg';
import { signOutHandle } from '../signin.js';

class UserProfile extends Component {
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
        <h3> Account Details</h3>
        <span>User Name: {userName}</span>
        <br />
        <span>Email: {email}</span>
        <br />
        <button onClick={() => this.props.toHistory()}>
          {' '}
          Session History{' '}
        </button>
        <br />
        <button id="sign_out" onClick={signOutHandle}>
          Sign Out
        </button>
      </div>
    );
  }
}

export default UserProfile;
