import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Post from "./Post";
import PostForm from "../PostForm";
import { addPostAction } from "../../../redux/profileReducer";
import { getPostData } from "../../../redux/profileSelector";

import styles from "./myPosts.module.scss";

const MyPosts = () => {
  const dispatch = useDispatch();

  const postData = useSelector((state) => getPostData(state));

  const addMessage = (formData) => {
    dispatch(addPostAction(formData.newPostText));
  };

  return (
    <div className={styles.myPosts}>
      <h2>My post</h2>
      <div className={styles.newPost}>
        <PostForm onSubmit={addMessage} />
      </div>
      <div className={styles.posts}>
        {postData.map(({ id, message, linksCount }) => (
          <Post key={id} message={message} linksCount={linksCount} />
        ))}
      </div>
    </div>
  );
};

export default memo(MyPosts);
