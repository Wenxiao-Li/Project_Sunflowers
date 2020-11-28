import React, { Component } from 'react';
import { useEffect } from 'react';
import SunflowerBg from '../../../assets/img/IMG_1277.jpg';
import firebase from '../../Background/modules/firebaseconfig';
import {
  changeUsernameHandle,
  addBlockListHandle,
  addAllowListHandle,
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

  const onSubmitUsername = (event) => {
    event.preventDefault();
    changeUsernameHandle(firstname.current.value, lastname.current.value);
  };

  const onSubmitBlockList = (event) => {
    event.preventDefault();
    addBlockListHandle(blacklist.current.value);
  };

  const onSubmitAllowList = (event) => {
    event.preventDefault();
    addAllowListHandle(whitelist.current.value);
  };

  const BlockListForm = () => {
    return (
      <form onSubmit={onSubmitBlockList}>
        <label>Add BlockList Website</label>
        <input type="url" name="addblacklist" ref={blacklist} required />
        <button type="submit">Add</button>
      </form>
    );
  };

  const AllowListForm = () => {
    return (
      <form onSubmit={onSubmitAllowList}>
        <label>Add AllowList Website</label>
        <input type="url" name="addwhitelist" ref={whitelist} required />
        <button type="submit">Add</button>
      </form>
    );
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
      <h1>Change Username</h1>
      <form onSubmit={onSubmitUsername}>
        <label>First Name</label>
        <input type="text" name="user_firstname" ref={firstname} required />
        <label>Last Name</label>
        <input type="text" name="user_lastname" ref={lastname} required />
        <input type="submit" value="Submit" />
      </form>
      {(isBlockList && <BlockListForm />) || <AllowListForm />}
    </div>
  );
}
