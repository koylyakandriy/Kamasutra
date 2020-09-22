import React from "react";
import { Field, reduxForm } from "redux-form";

import { Input } from "../common/FormsControls";
import { required } from "../../utils/validators";

import styles from "../common/FormsControls/formsControls.module.scss";

const LoginForm = ({ handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          type="text"
          placeholder="Email"
          name="email"
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          type="password"
          placeholder="Password"
          name="password"
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field type="checkbox" component={Input} name="rememberMe" />
        Remember me
      </div>
      {error && <div className={styles.formSummeryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

export default reduxForm({ form: "login" })(LoginForm);
