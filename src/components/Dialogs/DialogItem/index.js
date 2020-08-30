import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./dialogItem.module.scss";

const DialogItem = ({ name, id }) => {
  const path = `/dialogs/${id}`;
  return (
    <div className={styles.item}>
      <NavLink to={path}>{name}</NavLink>
    </div>
  );
};

export default DialogItem;
