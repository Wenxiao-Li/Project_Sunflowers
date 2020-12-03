import React, { Component } from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';
import UserProfile from './UserProfile/UserProfile.jsx';
import SessionHistory from './SessionHistory/SessionHistory.jsx';
import './UserProfile/UserProfile.css';

class ProfilePage extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      displayedComponent: 'UserProfile',
    };

    this.showComponent = this.showComponent.bind(this);
    this.toHistory = this.toHistory.bind(this);
    this.toProfile = this.toProfile.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  showComponent(componentName) {
    console.log(componentName);
    this.setState({ displayedComponent: componentName });
  }

  toHistory() {
    this.showComponent('SessionHistory');
  }

  toProfile() {
    this.showComponent('UserProfile');
  }

  render() {
    const components = {
      UserProfile: (
        <UserProfile user={this.props.user} toHistory={this.toHistory} />
      ),
      SessionHistory: (
        <SessionHistory user={this.props.user} toProfile={this.toProfile} />
      ),
    };
    return (
      <div className="page">
        <div>{components[this.state.displayedComponent]}</div>
      </div>
    );
  }
}

export default ProfilePage;
