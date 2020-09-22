import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/Login";
import Dialogs from "./components/Dialogs";
import Profile from "./components/Profile";

import "./App.scss";
import { PrivateRoute } from "./hoc/PriveateRoute";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />

        <Navbar />

        <main>
          <Switch>
            <Route exact path="/">
              Main
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/users">
              <UsersContainer />
            </Route>
            <PrivateRoute
              exect
              path="/profile/:profileId?"
              component={Profile}
            />
            <PrivateRoute path="/dialogs" component={Dialogs} />
          </Switch>
        </main>

        <footer className="footer">Footer</footer>
      </div>
    </Router>
  );
};

export default App;
