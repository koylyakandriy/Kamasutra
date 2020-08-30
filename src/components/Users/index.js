import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./users.module.scss";

const Users = ({
  pages,
  users,
  currentPage,
  setCurrentPage,
  successFollowThunk,
  successUnfollowThunk,
  followingInProgress
}) => {
  const defaultPhoto = "https://image.freepik.com/free-vector/_9385-36.jpg";

  const onFollow = userId => {
    successFollowThunk(userId);
  };

  const onUnfollow = userId => {
    successUnfollowThunk(userId);
  };

  return (
    <div className={styles.users}>
      <div className={styles.pagination}>
        {pages.map(page => (
          <span
            key={page}
            className={currentPage === page ? styles.active : ""}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </span>
        ))}
      </div>

      <div className={styles.usersList}>
        {users.map(user => (
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
                disabled={followingInProgress.some(id => id === user.id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className={styles.btn}
                onClick={() => onFollow(user.id)}
                disabled={followingInProgress.some(id => id === user.id)}
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
        ))}
      </div>
    </div>
  );
};

export default Users;
