import React, { Component } from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';

class UnauthPage extends Component {
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
    return (
      <div>
        <div className="unsignedSocial">
          <h3> Please sign in at profile page</h3>
        </div>
      </div>
    );
  }
}

export default UnauthPage;
