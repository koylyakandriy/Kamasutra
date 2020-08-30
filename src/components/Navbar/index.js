import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.links}>
        <li className={styles.linkItem}>
          <NavLink
            className={styles.link}
            exact
            to="/"
            activeClassName={styles.active}
          >
            Main
          </NavLink>
        </li>
        <li className={styles.linkItem}>
          <NavLink
            className={styles.link}
            to="/dialogs"
            activeClassName={styles.active}
          >
            Messages
          </NavLink>
        </li>
        <li className={styles.linkItem}>
          <NavLink
            className={styles.link}
            to="/users"
            activeClassName={styles.active}
          >
            Users
          </NavLink>
        </li>
        <li className={styles.linkItem}>
          <NavLink
            className={styles.link}
            to="news"
            activeClassName={styles.active}
          >
            News
          </NavLink>
        </li>
        <li className={styles.linkItem}>
          <NavLink
            className={styles.link}
            to="/musics"
            activeClassName={styles.active}
          >
            Musics
          </NavLink>
        </li>
        <li className={styles.linkItem}>
          <NavLink
            className={styles.link}
            to="/settings"
            activeClassName={styles.active}
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
