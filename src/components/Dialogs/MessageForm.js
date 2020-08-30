import React from "react";
import { Field, reduxForm } from "redux-form";

const MessageForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        component="textarea"
        name="newMessageText"
        placeholder="Enter your message"
      />
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

export default reduxForm({ form: "message" })(MessageForm);
