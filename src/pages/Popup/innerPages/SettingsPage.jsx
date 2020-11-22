import React, { Component } from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';
import firebase from '../../Background/modules/firebaseconfig';

class SettingsPage extends Component {
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
    const content = () => {
      if (this.props.user) {
        return (
          <div className="signedSettings">
            <h1>You are signed in</h1>
            <span>{this.props.user.email}</span>
          </div>
        );
      } else {
        return (
          <div className="unsignedSettings">
            <h1>You are not signed in</h1>
          </div>
        );
      }
    };

    return (
      <div className="Settings">
        <h1>This is SettingsPage</h1>
        <img src={SunflowerBg} />
        {content()}
      </div>
    );
  }
}

export default SettingsPage;
