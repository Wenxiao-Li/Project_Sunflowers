import React, { Component } from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';
import Leaderboard from './Leaderboard/Leaderboard.jsx';
import Friends from './Friends/Friends.jsx';
import Notifications from './Notifications/Notifications.jsx';

class SocialPage extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      displayedComponent: 'Leaderboard',
    };

    this.showComponent = this.showComponent.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  showComponent(componentName) {
    this.setState({ displayedComponent: componentName });
  }

  render() {
    const components = {
      Leaderboard: <Leaderboard user={this.props.user} />,
      Friends: <Friends user={this.props.user} />,
      Notifications: <Notifications user={this.props.user} />,
    };
    return (
      <div>
        <img src={SunflowerBg} />
        <br />
        <button onClick={() => this.showComponent('Leaderboard')}>
          Leaderboard
        </button>
        <button onClick={() => this.showComponent('Friends')}>Friends</button>
        <button onClick={() => this.showComponent('Notifications')}>
          Notifications
        </button>
        <div>{components[this.state.displayedComponent]}</div>
      </div>
    );
  }
}

export default SocialPage;
