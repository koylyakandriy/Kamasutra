import React from "react";

import styles from "./post.module.scss";

const Post = ({ message, linksCount }) => {
  return (
    <div className={styles.post}>
      <img src="https://html5css.ru/howto/img_avatar.png" alt="avatar" />
      {message}
      <div>
        <span>{linksCount}</span>
      </div>
    </div>
  );
};

export default Post;
