import React, { Component } from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';
import { signInHandle, signOutHandle } from '../modules/signin.js';
import firebase from '../../Background/modules/firebaseconfig';

class ProfilePage extends Component {
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
    var email = 'null';
    if (this.props.user) {
      email = this.props.user.email;
    }
    return (
      <div>
        <h1 id="page-name">You are signed in</h1>
        <span>Email: {email}</span>
        <button id="sign_out" onClick={signOutHandle}>
          Sign Out
        </button>
      </div>
    );
  }
}

export default ProfilePage;
