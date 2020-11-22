import React, {Component} from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';
import firebase from '../../Background/modules/firebaseconfig';

class SettingsPage extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            userEmail: "",
        };

        this.content = this.content.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        var self = this;
        var currentUser = firebase.auth().currentUser
        if (currentUser){
            self.setState({user: currentUser});
            self.setState({userEmail: currentUser.email})
            // TODO: Retrieve lists from local storage

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

    content(){
        if (this.state.user){
            return (
                <div className="signedSettings">
                    <h1>You are signed in</h1>
                    <span>{this.state.userEmail}</span>
                </div>
            );  
        } else {
            return (
                <div className="unsignedSettings">
                    <h1>You are not signed in</h1>
                </div>
            );
        }
    };

    
    render() {
        return (
            <div className="Settings">
                <h1>This is SettingsPage</h1>
                <img src={SunflowerBg} />
                {this.content()}
            </div>
        );
    }
}


export default SettingsPage;