import React from 'react';
import { HomePage } from './pages/Home/Home';
import { ProfilePage } from './pages/Profile/Profile';
import { NotFound } from './pages/NotFound/NotFound';
import { Header } from './components/Header/Header';
import { AuthRoute } from './components/AuthRoute/AuthRoute';
import { UserContext } from './context/userContext';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import firebase from 'firebase';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      setUser(firebaseUser);
    });
  }, []);

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
