import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { logoutThunkCreator } from "../../redux/authReducer";

import styles from "./header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth, userName } = useSelector((state) => ({
    isAuth: state.auth.isAuth,
    userName: state.auth.login,
  }));

  const logout = () => dispatch(logoutThunkCreator());

  return (
    <header className={styles.header}>
      <img
        src="https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/6882831431553666420-512.png"
        alt="logo"
      />
      <div className={styles.auth}>
        {!isAuth ? (
          <NavLink className={styles.link} to="/login">
            Login
          </NavLink>
        ) : (
          <div>
            <span className={styles.link}>{userName}</span> |{" "}
            <span onClick={logout}>Logout</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
