import firebase from '../../Background/modules/firebaseconfig';
var firebaseui = require('firebaseui');

const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      window.location.reload();
    },
  },
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        prompt: 'select_account',
      },
    },
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export const signInHandle = () => {
  ui.start('#firebaseui-auth-container', uiConfig);
};

export const signOutHandle = () => {
  firebase.auth().signOut();
};
