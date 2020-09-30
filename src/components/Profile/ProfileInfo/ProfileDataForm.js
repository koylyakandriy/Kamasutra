import React from "react";
import { Field, reduxForm } from "redux-form";

import { Input, Textarea } from "../../common/FormsControls";

import styles from '../../common/FormsControls/formsControls.module.scss';

const ProfileDataForm = ({
  profile,
  isOwner,
  saveProfile,
  handleSubmit,
  error,
}) => {
  console.log('error', error)
  return (
    <form onSubmit={handleSubmit}>
      {isOwner && <button onClick={saveProfile}>Save Profile</button>}
      {error && <div className={styles.formSummeryError}>{error}</div>}
      <div>
        <Field
          type="text"
          placeholder="Full Name"
          name="fullName"
          component={Input}
          validate={[]}
        />
      </div>
      <div>
        <Field
          type="text"
          placeholder="About Me"
          name="aboutMe"
          component={Input}
          validate={[]}
        />
      </div>

      <div>
        <Field
          type="checkbox"
          placeholder="Looking for a job"
          name="lookingForAJob"
          component={Input}
          validate={[]}
        />
      </div>

      <div>
        <Field
          type="text"
          placeholder="Job description"
          name="lookingForAJobDescription"
          component={Textarea}
          validate={[]}
        />
      </div>
      <div>
        <h2>Contacts:</h2>
        {Object.entries(profile.contacts).map(([key, value]) => (
          <div key={key}>
            <span>{key}</span>:
            <Field
              type="text"
              placeholder={`${key} link`}
              name={`contacts.${key}`}
              component={Input}
              validate={[]}
            />
          </div>
        ))}
      </div>
    </form>
  );
};

export default reduxForm({ form: "editProfile" })(ProfileDataForm);
