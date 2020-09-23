import React, { useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/Login";
import Dialogs from "./components/Dialogs";
import Profile from "./components/Profile";
import { PrivateRoute } from "./hoc/PriveateRoute";
import { initializedSuccessThunkCreator } from "./redux/appReducer";

import "./App.scss";
import Loader from "./components/common/Loader";

const App = () => {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.app.initialized);

  const initializedSuccessThunk = useCallback(() => {
    dispatch(initializedSuccessThunkCreator());
  }, [dispatch]);

  useEffect(() => {
    initializedSuccessThunk();
  }, [initializedSuccessThunk]);

  return (
    <>
      {initialized ? (
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
                <Route exect path="/profile/:profileId?" component={Profile} />
                <PrivateRoute path="/dialogs" component={Dialogs} />
              </Switch>
            </main>

            <footer className="footer">Footer</footer>
          </div>
        </Router>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default App;
