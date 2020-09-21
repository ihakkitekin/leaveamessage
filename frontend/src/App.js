import React from 'react';
import { HomePage } from './pages/Home';
import { Header } from './components/Header/Header';
import { UserContext } from './context/userContext';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import firebase from 'firebase';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      console.log(firebaseUser)
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
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </div>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
