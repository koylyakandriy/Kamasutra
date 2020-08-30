import React from "react";
import { useDispatch, useSelector } from "react-redux";

import DialogItem from "./DialogItem";
import Message from "./Messages";
import MessageForm from "./MessageForm";
import { sendMessageAction } from "../../redux/messagesReducer";

import styles from "./dialogs.module.scss";

const Dialogs = () => {
  const dispatch = useDispatch();
  const { messagesPage } = useSelector(state => ({
    messagesPage: state.messagesPage
  }));

  const onSendMessage = formData => {
    dispatch(sendMessageAction(formData.newMessageText));
  };

  return (
    <section className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {messagesPage.dialogData.map(({ name, id }) => (
          <DialogItem key={id} name={name} id={id} />
        ))}
      </div>

      <div className={styles.messages}>
        <div>
          {messagesPage.messageData.map(({ message, id }) => (
            <Message message={message} key={id} />
          ))}
        </div>
        <MessageForm onSubmit={onSendMessage} />
      </div>
    </section>
  );
};

export default Dialogs;
