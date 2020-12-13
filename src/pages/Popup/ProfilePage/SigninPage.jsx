import React from 'react';
import { signInHandle } from './signin.js';
import SunflowerIcon from '../../../assets/img/sunflowerIcon.jpg';
import './SigninPage.css';

const SigninPage = () => {
  React.useEffect(() => {
    signInHandle();
  }, []);

  return (
    <div className="page">
      <div className="join">Join
        <img className="joinSun" src={SunflowerIcon} />
      </div>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default SigninPage;
