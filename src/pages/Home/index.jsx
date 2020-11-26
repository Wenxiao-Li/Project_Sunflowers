import React from 'react';
import { render } from 'react-dom';

import './index.css';
import firebase from '../Background/modules/firebaseconfig';


const Home = () => {
    const testComm = () => {
        chrome.runtime.sendMessage({
            msg: "home-comm",
            data: {}
        });
    }

    let auth = firebase.auth().currentUser;
    let authString = 'empty';
    if (auth == null){
        authString = 'empty';
    } else {
        authString = auth.displayName;
    }

    return (
        <div>
        <h1 id="welcome">Welcome to our home page!</h1>
        <button onClick={testComm}> send to background</button>
        <button onClick={()=>{
                let auth = firebase.auth().currentUser;
                let authString = 'empty';
                if (auth == null){
                    authString = 'empty';
                } else {
                    authString = auth.displayName;
                }console.log(authString)
            }}>check userStatus</button>
    </div>
    );
}


render(
    <Home/>,
    window.document.querySelector('#app-container')
);