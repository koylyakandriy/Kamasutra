import React, { useCallback, useEffect, lazy, Suspense, FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { PrivateRoute } from "./hoc/PriveateRoute";
import { initializedSuccessThunkCreator } from "./redux/appReducer";
import Loader from "./components/common/Loader";

import "./App.scss";
import { AppStateType } from "./redux/redux-store";

const Profile = lazy(() => import("./components/Profile"));
const Dialogs = lazy(() => import("./components/Dialogs/index"));
const UsersContainer = lazy(() => import("./components/Users/UsersContainer"));
const Login = lazy(() => import("./components/Login"));

const App: FC = () => {
  const dispatch = useDispatch();
  const initialized = useSelector(
      (state: AppStateType) => state.app.initialized
  );

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
                    <Suspense fallback={<Loader />}>
                      <Route exact path="/login">
                        <Login />
                      </Route>
                      <Route path="/users">
                        <UsersContainer />
                      </Route>
                      <Route
                          exect
                          path="/profile/:profileId?"
                          component={Profile}
                      />
                      <PrivateRoute path="/dialogs" component={Dialogs} />
                    </Suspense>
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
