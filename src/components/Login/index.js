import React from "react";

import LoginForm from "./LoginForm";

import styles from "./login.module.scss";

const Login = () => {
  const onSubmit = formData => {
    console.log('formData:', formData);
  }
  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit}/>
    </div>
  );
};

export default Login;
