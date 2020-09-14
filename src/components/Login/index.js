import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import LoginForm from "./LoginForm";
import { loginThunkCreator } from "../../redux/authReducer";

import styles from "./login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(loginThunkCreator(email, password, rememberMe));
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
