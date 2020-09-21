import React from 'react';
import './loginContainer.css';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';

export function LoginContainer() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      console.log(firebaseUser)
      if (!firebaseUser) {
        const ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', {
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
          ],
          signInSuccessUrl: '/'
        });
      } else {
        setUser(firebaseUser);
      }

    });
  }, []);

  return <div>
    <div id="firebaseui-auth-container"></div>
    {user && <div>{user.displayName}</div>}
  </div>
}