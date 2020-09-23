import React from 'react';
import { HomePage } from './pages/Home/Home';
import { ProfilePage } from './pages/Profile/Profile';
import { NotFound } from './pages/NotFound/NotFound';
import { Header } from './components/Header/Header';
import { MainLoading } from './components/MainLoading/MainLoading';
import { AuthRoute } from './components/AuthRoute/AuthRoute';
import { UserContext } from './context/userContext';
import UserService from './services/userService';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import firebase from 'firebase';
import * as config from './utils/config';

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let unsubscribeUserChange;
    config.init().then(() => {
      firebase.auth().onAuthStateChanged(async function (firebaseUser) {
        const userResult = await UserService.onSuccessfulLogin(firebaseUser);
  
        unsubscribeUserChange = UserService.onUserDetailChange((newUserDetail) => {
          setUser(prev => {
            return { ...prev, ...newUserDetail }
          });
        }, userResult);
  
        setUser(userResult);
        setLoading(false);
      });
    });

    return () => {
      typeof unsubscribeUserChange !== 'undefined' && unsubscribeUserChange();
    }
  }, []);

  if (loading) {
    return <MainLoading />
  }

  return (
    <Router>
      <UserContext.Provider value={user}>
        <div className="app">
          <Header user={user} />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <AuthRoute path="/profile">
                <ProfilePage />
              </AuthRoute>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
