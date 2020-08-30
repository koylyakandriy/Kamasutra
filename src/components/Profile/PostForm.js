import React from "react";
import { Field, reduxForm } from "redux-form";

const PostForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field component="textarea" name="newPostText" placeholder="New Post"/>
      <button>Add post</button>
    </form>
  );
};

export default reduxForm({ form: "newPostText" })(PostForm);
