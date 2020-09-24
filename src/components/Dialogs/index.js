import React from "react";
import { useDispatch, useSelector } from "react-redux";

import DialogItem from "./DialogItem";
import Message from "./Messages";
import MessageForm from "./MessageForm";
import { sendMessageAction } from "../../redux/messagesReducer";
import { getDialogData, getMessageData } from "../../redux/messagesSelector";

import styles from "./dialogs.module.scss";

const Dialogs = () => {
  const dispatch = useDispatch();
  const { dialogData, messageData } = useSelector((state) => ({
    dialogData: getDialogData(state),
    messageData: getMessageData(state),
  }));

  const onSendMessage = (formData) => {
    dispatch(sendMessageAction(formData.newMessageText));
  };

  return (
    <section className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {dialogData.map(({ name, id }) => (
          <DialogItem key={id} name={name} id={id} />
        ))}
      </div>

      <div className={styles.messages}>
        <div>
          {messageData.map(({ message, id }) => (
            <Message message={message} key={id} />
          ))}
        </div>
        <MessageForm onSubmit={onSendMessage} />
      </div>
    </section>
  );
};

export default Dialogs;
