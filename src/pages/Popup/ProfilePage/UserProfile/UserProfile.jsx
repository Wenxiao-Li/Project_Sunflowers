import React, { Component } from 'react';
import SunflowerBg from '../../../../assets/img/header.png';
import profP from '../../../../assets/img/profile pic';
import { signOutHandle } from '../signin.js';



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
        <img class="bg" src={SunflowerBg} />

        <div class="profile">
          <img class="profilep" src={profP} />
          <div class="un">{userName}</div>

        </div>

        <div class="ad"> Account Details</div>
        <div class="ad">User Name:
        <span class="u">{userName} </span>
        </div>
        <div class="ad">Email:
        <span class="u">{email}</span>
        </div>
        <br />
        <div class="vts"> View Total Sunflowers
          <img class="profilep" src={profP} />
        </div>
        <div class="button">
          <button class="ui_button" onClick={() => this.props.toHistory()}>
            {' '}
          Session History{' '}
          </button>
        </div>
        <br />
        <div class="so">
          <button class="ui_button" id="sign_out" onClick={signOutHandle}>
            Sign Out
        </button>
        </div>
      </div >
    );
  }
}


export default UserProfile;
