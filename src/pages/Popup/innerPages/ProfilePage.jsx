import React, {Component} from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';
import {signInHandle, signOutHandle} from '../modules/signin.js';
import firebase from '../../Background/modules/firebaseconfig';

class ProfilePage extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            userEmail: "",
        };

        this.signedProfile = this.signedProfile.bind(this);
        this.unsignedProfile = this.unsignedProfile.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        var self = this;
        var currentUser = firebase.auth().currentUser
        if (currentUser){
            self.setState({user: currentUser});
            self.setState({userEmail: currentUser.email})
        } else {
            self.setState({user: null});
            self.setState({userEmail: ""});
        }
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              self.setState({user: user});
              self.setState({userEmail: user.email});
            } else {
              // No user is signed in.
              self.setState({user: null});
              self.setState({userEmail: ""});
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    signedProfile(){
        const email = this.state.userEmail;
        return (
            <div className="signedProfile">
                <h1 id='page-name'>You are signed in</h1>
                <span>{email}</span>
                <button id="sign_out" onClick={signOutHandle}>Sign Out</button>
            </div>
        );
    };


    unsignedProfile(){
        return (
            <div className="UnsignedProfile">
                <h1 id='page-name'>You are not signed in</h1>
                <div id="firebaseui-auth-container"></div>
                <button id="sign_in" onClick={signInHandle}>Sign In</button>
            </div>
        );
    };
    
    render() {
        const user = this.state.user;
        if (this.state.user){
            return <div>{this.signedProfile()}</div>;
        } else {
            return <div>{this.unsignedProfile()}</div>;
        }
    }
}

export default ProfilePage;