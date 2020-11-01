import React, { ReactNode, FC } from "react";

import styles from "./formsControls.module.scss";
import { WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";

type FormControlParamsType = {
  meta: WrappedFieldMetaProps;
  children: ReactNode;
};

// type FormControlType = (params: FormControlParamsType) => ReactNode;

const FormControl: FC<FormControlParamsType> = ({ meta, children }) => {
  const hasError = meta.touched && meta.error;

  return (
    <div className={`${styles.formControl} ${hasError ? styles.error : ""}`}>
      {children}
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Textarea: FC<WrappedFieldProps> = (props) => {
  const { input, meta, children, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input: FC<WrappedFieldProps> = (props) => {
  const { input, meta, children, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};
