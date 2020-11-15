import React from 'react';
import './Options.css';
import {signInHandle} from './modules/SignIn';


const Options = () => {
  console.log('From Options.jsx');

  return (
    <div className="OptionsContainer">
      Page
      <div id="firebaseui-auth-container"></div>
      <button id="sign_in" onClick={signInHandle}>Sign In</button>
    </div>
  );
};

export default Options;
