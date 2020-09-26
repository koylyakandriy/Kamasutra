import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./users.module.scss";

const User = ({
  user,
  defaultPhoto,
  onUnfollow,
  followingInProgress,
  onFollow,
}) => {
  return (
    <div key={user.id} className={styles.container}>
      <span className={styles.leftGroup}>
        <NavLink to={`/profile/${user.id}`}>
          <img
            className={styles.avatar}
            src={user.photos.small || defaultPhoto}
            alt="avatar"
          />
        </NavLink>
      </span>

      {user.followed ? (
        <button
          className={styles.btn}
          onClick={() => onUnfollow(user.id)}
          disabled={followingInProgress.some((id) => id === user.id)}
        >
          Unfollow
        </button>
      ) : (
        <button
          className={styles.btn}
          onClick={() => onFollow(user.id)}
          disabled={followingInProgress.some((id) => id === user.id)}
        >
          Follow
        </button>
      )}

      <span className={styles.rightGroup}>
        <span>
          <div>{user.name}</div>
          <div>{user.status || "My status"}</div>
        </span>
        {/*<span>*/}
        {/*  <div>{user.location.country}</div>*/}
        {/*  <div>{user.location.city}</div>*/}
        {/*</span>*/}
      </span>
    </div>
  );
};

export default User;
