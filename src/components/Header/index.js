import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getAuthUserDataThunkCreator } from "../../redux/authReducer";

import styles from "./header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth, login } = useSelector(state => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }));

  const getAuthUserDataThunk = useCallback(() => {
    dispatch(getAuthUserDataThunkCreator());
  }, [dispatch]);

  useEffect(() => {
    getAuthUserDataThunk();
    // toggleIsFetching(false);
  }, [getAuthUserDataThunk]);

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
          <span className={styles.link}>{login}</span>
        )}
      </div>
    </header>
  );
};

export default Header;
