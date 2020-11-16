import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import LoginForm from "./LoginForm";
import { loginThunkCreator } from "../../redux/authReducer";
import { getCaptchaUrl, getIsAuth } from "../../redux/authSelector";

import styles from "./login.module.scss";

type MapStatePropsType = {
  isAuth: boolean;
  captchaUrl: string | null;
};

export type LoginFormValueType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string | null;
};

const Login: FC = () => {
  const dispatch = useDispatch();
  const { isAuth, captchaUrl } = useSelector(
    (state): MapStatePropsType => ({
      isAuth: getIsAuth(state),
      captchaUrl: getCaptchaUrl(state),
    })
  );

  const onSubmit = ({
    email,
    password,
    rememberMe,
    captcha,
  }: LoginFormValueType) => {
    dispatch(loginThunkCreator(email, password, rememberMe, captcha));
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};

export default Login;
