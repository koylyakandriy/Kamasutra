import React, { FC } from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";

import { Input } from "../common/FormsControls";
import { required } from "../../utils/validators";

import { LoginFormValueType } from "./index";

import styles from "../common/FormsControls/formsControls.module.scss";

type LoginFormOwnProps = {
  captchaUrl: string | null;
};

const LoginForm: FC<
  LoginFormOwnProps & InjectedFormProps<LoginFormValueType, LoginFormOwnProps>
> = ({ handleSubmit, error, captchaUrl }) => {
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
      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
      {captchaUrl && (
        <Field
          type="text"
          placeholder="Symbols from image"
          name="captcha"
          component={Input}
          validate={[required]}
        />
      )}
      {error && <div className={styles.formSummeryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

export default reduxForm<LoginFormValueType, LoginFormOwnProps>({
  form: "login",
})(LoginForm);
