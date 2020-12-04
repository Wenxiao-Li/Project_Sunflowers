import React from 'react';
import { signInHandle } from './signin.js';

const SigninPage = () => {
  React.useEffect(() => {
    signInHandle();
  }, []);

  return (
    <div className="page">
      <h3>This is the sign in page</h3>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default SigninPage;
