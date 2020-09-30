import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import LoginForm from "./LoginForm";
import { loginThunkCreator } from "../../redux/authReducer";
import { getCaptchaUrl, getIsAuth } from "../../redux/authSelector";

import styles from "./login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuth, captchaUrl } = useSelector((state) => ({
    isAuth: getIsAuth(state),
    captchaUrl: getCaptchaUrl(state),
  }));

  const onSubmit = ({ email, password, rememberMe, captcha }) => {
    dispatch(loginThunkCreator(email, password, rememberMe, captcha));
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
  );
};

export default Login;
