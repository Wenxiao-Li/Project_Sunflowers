import React, {Component} from 'react';
import HomePage from './innerPages/HomePage.jsx';
import ProfilePage from './innerPages/ProfilePage.jsx';
import SettingsPage from './innerPages/SettingsPage.jsx';
import SocialPage from './innerPages/SocialPage.jsx';
import './Popup.css';


class Popup extends Component {

  constructor(props) {
      super(props);

      this.state = {
          displayedPageName: "HomePage"
      };

      this.components = {
          "HomePage": <HomePage/>,
          "SettingsPage": <SettingsPage/>,
          "SocialPage": <SocialPage/>,
          "ProfilePage": <ProfilePage/>
      }
  }

  showComponent(componentName) {
      this.setState({displayedPageName: componentName});
  }

  render() {
      return (
          <div>
              <div>
                {this.components[this.state.displayedPageName]}
              </div>
              <div>
                <button onClick={() => this.showComponent("HomePage")}>Home</button>
                <button onClick={() => this.showComponent("SettingsPage")}>Settings</button>
                <button onClick={() => this.showComponent("SocialPage")}>Social</button>
                <button onClick={() => this.showComponent("ProfilePage")}>Profile</button>
              </div>
          </div>
      );
  }
}

export default Popup;
