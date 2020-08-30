import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Post from "./Post";
import PostForm from "../PostForm";
import { addPostAction } from "../../../redux/profileReducer";

import styles from "./myPosts.module.scss";

const MyPosts = () => {
  const dispatch = useDispatch();

  const { profilePage } = useSelector(state => ({
    profilePage: state.profilePage
  }));

  const addMessage = formData => {
    dispatch(addPostAction(formData.newPostText));
  };

  return (
    <div className={styles.myPosts}>
      <h2>My post</h2>
      <div className={styles.newPost}>
        <PostForm onSubmit={addMessage} />
      </div>
      <div className={styles.posts}>
        {profilePage.postData.map(({ id, message, linksCount }) => (
          <Post key={id} message={message} linksCount={linksCount} />
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
