import React, { Component } from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';
import firebase from '../../Background/modules/firebaseconfig';

class SocialPage extends Component {
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
      let user = this.props.user;
      if (user) {
        return (
          <div className="signedSettings">
            <h1>You are signed in</h1>
            <span>{user.email}</span>
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
      <div className="Social">
        <h1>This is SocialPage</h1>
        <img src={SunflowerBg} />
        {content()}
      </div>
    );
  }
}

export default SocialPage;
