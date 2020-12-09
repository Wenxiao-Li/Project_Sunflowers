import React, { Component } from 'react';
import profP from '../../../../assets/img/profile pic';
import SunflowerIcon from '../../../../assets/img/profileSun';
import { signOutHandle } from '../signin.js';
import './UserProfile.css';

class UserProfile extends Component {
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
        <div className="profile">
          <img className="profilep" src={profP} />
          <div className="un">{userName}</div>
        </div>

        <div className="ad"> Account Details</div>
        <div className="ad">
          User Name:
          <span className="u">{userName} </span>
        </div>
        <div className="ad">
          Email:
          <span className="u">{email}</span>
        </div>
        <br />
        <div className="vts">
          {' '}
          View Total Sunflowers
          <img className="sunflower" src={SunflowerIcon} />
          <span>{this.props.numFlower}</span>
          <br />
        </div>
        <div className="button">
          <button className="ui_button" onClick={() => this.props.toHistory()}>
            {' '}
            Session History{' '}
          </button>
        </div>
        <br />
        <div className="so">
          <button className="ui_button" id="sign_out" onClick={signOutHandle}>
            Sign Out
          </button>
        </div>
      </div>
    );
  }
}

export default UserProfile;
