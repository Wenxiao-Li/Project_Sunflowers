import React, { Component } from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';
import { signInHandle, signOutHandle } from './signin.js';
import firebase from '../../Background/modules/firebaseconfig';

class SigininPage extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._isMounted = true;
    signInHandle();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <h1>This is the sign in page</h1>
        <div id="firebaseui-auth-container"></div>
      </div>
    );
  }
}

export default SigininPage;
