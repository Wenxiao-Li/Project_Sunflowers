import React, { Component } from 'react';
import { useEffect } from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';
import firebase from '../../Background/modules/firebaseconfig';
import {
  changeUsernameHandle,
  addBlacklistHandle,
  addWhitelistHandle,
  viewWebsitelistHandle,
} from './setting';

// The 2020 way of using react: use functional components
export default function SettingsPage() {
  // Set States goes here
  const firstname = React.useRef(null);
  const lastname = React.useRef(null);
  const blacklist = React.useRef(null);
  const whitelist = React.useRef(null);

  /**
   * Description: Initializing States, do not pass function into useState
   * isBlockList: state
   * setBlockListBoolean: setState for isBlockList, this is async so be careful
   * param: initial value
   */

  const [isBlockList, setBlockListBoolean] = React.useState(true);
  const [blockList, setBlockList] = React.useState([]);
  const [allowList, setAllowList] = React.useState([]);
  // use the return of useEffect for componentWillUnmount

  // Run after every re-render
  // React.useEffect(() => {});

  // Equivalent to componentDidMount and return = componentWillUnMount
  // React.useEffect(() => {}, []);

  const setBlockListMode = () => {
    console.log('I am changing the mode to blockListMode');
    setBlockListBoolean(true);
  };

  const setAllowListMode = () => {
    setBlockListBoolean(false);
  };

  const onSubmitUsername = (event) => {
    event.preventDefault();
    changeUsernameHandle(firstname.current.value, lastname.current.value);
  };

  const onSubmitBlacklist = (event) => {
    event.preventDefault();
    addBlacklistHandle(blacklist.current.value);
  };

  const onSubmitWhitelist = (event) => {
    event.preventDefault();
    addWhitelistHandle(whitelist.current.value);
  };

  const currentMode = isBlockList ? 'BlockList' : 'AllowList';

  const onViewWebsite = () => {
    console.log('I am viewing the websites');
    // currentWebsite = viewWebsitelistHandle()[0];
    console.log(viewWebsitelistHandle(displayLists));
  };

  const displayLists = (blockList, allowList) => {
    setBlockList(blockList);
    setAllowList(allowList);
  };

  const Website = (props) => {
    return <li> {props.url}</li>;
  };

  return (
    <div className="Settings">
      <h1>This is SettingsPage</h1>
      <button onClick={setBlockListMode}> BlockList Mode </button>
      <button onClick={setAllowListMode}> AllowList Mode </button>
      <button onClick={onViewWebsite}> view websites </button>
      <img src={SunflowerBg} />
      <br />
      <span>{currentMode}</span>
      {/* <span>{currentWebsite}</span> */}
      <h1>Change Username</h1>
      <form onSubmit={onSubmitUsername}>
        <label>First Name</label>
        <input type="text" name="user_firstname" ref={firstname} required />
        <label>Last Name</label>
        <input type="text" name="user_lastname" ref={lastname} required />
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={onSubmitBlacklist}>
        <label>Add Blacklist Website</label>
        <input type="url" name="addblacklist" ref={blacklist} required />
        <button type="submit">Add</button>
      </form>
      <form onSubmit={onSubmitWhitelist}>
        <label>Add Whitelist Website</label>
        <input type="url" name="addwhitelist" ref={whitelist} required />
        <button type="submit">Add</button>
      </form>
      <span> Block Lists </span>
      <ul>
        {blockList.map((site) => (
          <Website key={site} url={site} />
        ))}
      </ul>
      <span> AllowLists </span>
      <ul>
        {allowList.map((site) => (
          <Website key={site} url={site} />
        ))}
      </ul>
    </div>
  );
}
