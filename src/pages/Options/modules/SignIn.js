import firebase from '../../Background/modules/FirebaseConfig';
var firebaseui = require('firebaseui');

const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        chrome.runtime.sendMessage({message : "sign_in", user : firebase.auth().currentUser}, (response) => {
            if (response.message == "success") {
                window.location.replace('./home.html');
            }
        });
        return false;
      },
      uiShown: function() {
        //document.getElementById('page-name').style.display = 'none';
        document.getElementById('sign_in').style.display = 'none';
      }
    },
    signInFlow: 'popup',
    signInSuccessUrl: './home.html',
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            customParameters: {
                prompt: 'select_account'
            }
        },
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
};

export const signInHandle = () => {
    ui.start('#firebaseui-auth-container', uiConfig);
}