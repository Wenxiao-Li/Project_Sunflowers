import React, { Component } from 'react';
import firebase from '../Background/modules/firebaseconfig';
import HomePage from './innerPages/HomePage.jsx';
import ProfilePage from './innerPages/ProfilePage.jsx';
import SettingsPage from './innerPages/SettingsPage.jsx';
import SocialPage from './innerPages/SocialPage.jsx';
import SigninPage from './innerPages/SigninPage.jsx';
import './Popup.css';

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayedPageName: 'HomePage',
      user: null,
    };

    this.showComponent = this.showComponent.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    var self = this;
    var currentUser = firebase.auth().currentUser;
    if (currentUser) {
      self.setState({ user: currentUser });
    } else {
      self.setState({ user: null });
    }
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        self.setState({ user: user });
        self.setState({ userEmail: user.email });
      } else {
        // No user is signed in.
        self.setState({ user: null });
        self.showComponent('HomePage');
      }
    });
  }

  showComponent(componentName) {
    if (!this.state.user) {
      if (componentName === 'ProfilePage') {
        componentName = 'SigninPage';
      }
    }
    this.setState({ displayedPageName: componentName });
  }

  render() {
    const components = {
      HomePage: <HomePage />,
      SettingsPage: <SettingsPage user={this.state.user} />,
      SocialPage: <SocialPage user={this.state.user} />,
      ProfilePage: <ProfilePage user={this.state.user} />,
      SigninPage: <SigninPage user={this.state.user} />,
    };

    return (
      <div>
        <div>{components[this.state.displayedPageName]}</div>
        <div>
          <button onClick={() => this.showComponent('HomePage')}>Home</button>
          <button onClick={() => this.showComponent('SettingsPage')}>
            Settings
          </button>
          <button onClick={() => this.showComponent('SocialPage')}>
            Social
          </button>
          <button onClick={() => this.showComponent('ProfilePage')}>
            Profile
          </button>
        </div>
      </div>
    );
  }
}

export default Popup;
