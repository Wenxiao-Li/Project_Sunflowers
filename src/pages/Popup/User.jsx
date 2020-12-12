import React from 'react';
import firebase from '../Background/modules/firebaseconfig';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [snapshotData, setSnapshotData] = React.useState();

  function getUserSnapshot(request, sender, senderResponse) {
    if (request.msg === 'user_snapshot') {
      console.log(request.snapshotdata);
      setSnapshotData(request.snapshotdata);
    }
  }

  React.useEffect(() => {
    if (user) {
      console.log('try to retrieve for new snapshot');
      chrome.runtime.sendMessage({
        msg: 'get_snapshot',
      });
      chrome.runtime.onMessage.addListener(getUserSnapshot);
    }
    return () => {
      chrome.runtime.onMessage.removeListener(getUserSnapshot);
    };
  }, [user]);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, snapshotData }}>
      {children}
    </UserContext.Provider>
  );
};
