import React from "react";
import { Field, reduxForm } from "redux-form";

const LoginForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field type="text" placeholder="Login" name="login" component="input" />
      </div>
      <div>
        <Field
          type="password"
          placeholder="Password"
          name="password"
          component="input"
        />
      </div>
      <div>
        <Field type="checkbox" component="input" name="rememberMe" />
        Remember me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

export default reduxForm({ form: "login" })(LoginForm);
