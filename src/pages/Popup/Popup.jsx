import React, { Component } from 'react';
import firebase from '../Background/modules/firebaseconfig';
import HomePage from './HomePage/HomePage.jsx';
import ProfilePage from './ProfilePage/ProfilePage.jsx';
import SettingsPage from './SettingsPage/SettingsPage.jsx';
import SocialPage from './SocialPage/SocialPage.jsx';
import SigninPage from './ProfilePage/SigninPage.jsx';
import UnauthPage from './SocialPage/UnauthPage.jsx';

import { Container, Row, Col } from 'react-bootstrap';
import './Popup.css';
import SunflowerBg from '../../assets/img/header.png';
import HomeIcon from '../../assets/img/homeTab.png';
import SocialIcon from '../../assets/img/socialTab.png';
import SettingsIcon from '../../assets/img/settingTab.png';
import ProfileIcon from '../../assets/img/profileTab.png';

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
      if (componentName === 'SocialPage') {
        componentName = 'UnauthPage';
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
      UnauthPage: <UnauthPage user={this.state.user} />,
    };
    let dpName = this.state.displayedPageName;
    return (
      <div>
        <img src={SunflowerBg}></img>
        <div>{components[dpName]}</div>
        <Container>
          <Row id="bottom-icon-navbar">
            <Col>
              <img
                className={dpName === 'HomePage' ? 'icons active' : 'icons'}
                src={HomeIcon}
                onClick={() => this.showComponent('HomePage')}
              />
            </Col>
            <Col>
              <img
                className={dpName === 'SettingsPage' ? 'icons active' : 'icons'}
                src={SettingsIcon}
                onClick={() => this.showComponent('SettingsPage')}
              />
            </Col>
            <Col>
              <img
                className={
                  dpName === 'SocialPage' || dpName === 'UnauthPage'
                    ? 'icons active'
                    : 'icons'
                }
                src={SocialIcon}
                onClick={() => this.showComponent('SocialPage')}
              />
            </Col>
            <Col>
              <img
                className={
                  dpName === 'ProfilePage' || dpName === 'SigninPage'
                    ? 'icons active'
                    : 'icons'
                }
                src={ProfileIcon}
                onClick={() => this.showComponent('ProfilePage')}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Popup;
