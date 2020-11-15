var firebase = require('firebase').default;
require("firebase/firestore");
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

const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export default firebase;