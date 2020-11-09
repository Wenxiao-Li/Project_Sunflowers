const firebaseConfig = {
  apiKey: "AIzaSyCtWDsDR0wnBQdP-nx4YhRmMlUHozwPwJI",
  authDomain: "sunflower-aac92.firebaseapp.com",
  databaseURL: "https://sunflower-aac92.firebaseio.com",
  projectId: "sunflower-aac92",
  storageBucket: "sunflower-aac92.appspot.com",
  messagingSenderId: "641935308613",
  appId: "1:641935308613:web:e9a223e83216333a0af02c",
  measurementId: "G-BK1D21C7SF"
};

firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      chrome.runtime.sendMessage({ message: "sign_in" }, (response) => {
        if (response.message === "success") {
          window.location.replace('./home.html');
        }
      });
      return false;
    },
    uiShown: function () {
      document.getElementById('page-name').style.display = 'none';
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

document.getElementById('sign_in').addEventListener('click', () => {
  ui.start('#firebaseui-auth-container', uiConfig);
})