import React from "react";
import { Field, reduxForm } from "redux-form";

import { maxLengthCreator, required } from "../../utils/validators";
import { Textarea } from "../common/FormsControls";

const maxLength10 = maxLengthCreator(10);

const PostForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={Textarea}
        name="newPostText"
        placeholder="New Post"
        validate={[required, maxLength10]}
      />
      <button>Add post</button>
    </form>
  );
};

export default reduxForm({ form: "newPostText" })(PostForm);
