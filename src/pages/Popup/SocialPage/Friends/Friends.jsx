import React, { Component } from 'react';
import SunflowerBg from '../../../../assets/img/IMG_1277.jpg';

class Friends extends Component {
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
        <h1> Friends</h1>
        <span>User Name: {userName}</span>
        <br />
        <span>Email: {email}</span>
      </div>
    );
  }
}

export default Friends;
