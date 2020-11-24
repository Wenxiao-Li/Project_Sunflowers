import React, { Component } from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';
import firebase from '../../Background/modules/firebaseconfig';

class SettingsPage extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      isBlockListMode: true,
    };

    this.setBlockListMode = this.setBlockListMode.bind(this);
    this.setAllowListMode = this.setAllowListMode.bind(this);
    this.getCurrModeString = this.getCurrModeString.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setBlockListMode() {
    this.setState({ isBlockListMode: true });
  }

  setAllowListMode() {
    this.setState({ isBlockListMode: false });
  }

  getCurrModeString() {
    if (this.state.isBlockListMode) {
      return 'BlockList';
    } else {
      return 'AllowList';
    }
  }

  render() {
    let modeString = this.getCurrModeString();
    return (
      <div className="Settings">
        <h1>This is SettingsPage</h1>
        <button onClick={this.setBlockListMode}> BlockList Mode </button>
        <button onClick={this.setAllowListMode}> AllowList Mode </button>
        <img src={SunflowerBg} />
        <br />
        <span>{modeString}</span>
      </div>
    );
  }
}

export default SettingsPage;
