import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { getIsAuth } from "../redux/authSelector";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useSelector((state) => ({
    isAuth: getIsAuth(state),
  }));

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
