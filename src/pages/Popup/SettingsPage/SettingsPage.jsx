import React, { Component } from 'react';
import { useEffect } from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';
import firebase from '../../Background/modules/firebaseconfig';

// The 2020 way of using react: use functional components
export default function SettingsPage() {
  // Set States goes here

  /**
   * Description: Initializing States, do not pass function into useState
   * isBlockList: state
   * setBlockListBoolean: setState for isBlockList, this is async so be careful
   * param: initial value
   */
  const [isBlockList, setBlockListBoolean] = React.useState(true);

  // use the return of useEffect for componentWillUnmount

  // Run after every re-render
  // React.useEffect(() => {});

  // Equivalent to componentDidMount and return = componentWillUnMount
  // React.useEffect(() => {}, []);

  const setBlockListMode = () => {
    setBlockListBoolean(true);
  };

  const setAllowListMode = () => {
    setBlockListBoolean(false);
  };

  const currentMode = isBlockList ? 'BlockList' : 'AllowList';
  return (
    <div className="Settings">
      <h1>This is SettingsPage</h1>
      <button onClick={setBlockListMode}> BlockList Mode </button>
      <button onClick={setAllowListMode}> AllowList Mode </button>
      <img src={SunflowerBg} />
      <br />
      <span>{currentMode}</span>
    </div>
  );
}
