import React from "react";
import { Field, reduxForm } from "redux-form";

import { Textarea } from "../common/FormsControls";
import { maxLengthCreator, required } from '../../utils/validators';

const maxLength100 = maxLengthCreator(100);

const MessageForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={Textarea}
        name="newMessageText"
        placeholder="Enter your message"
        validate={[required, maxLength100]}
      />
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

export default reduxForm({ form: "message" })(MessageForm);
