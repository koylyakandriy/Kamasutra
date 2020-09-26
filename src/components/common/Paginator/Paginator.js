import React from "react";
import styles from "./paginator.module.scss";

const Paginator = ({ currentPage, setCurrentPage, totalUsers, pageSize }) => {
  
  const pagesCount = Math.ceil(totalUsers / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.paginator}>
      {pages.map((page) => (
        <span
          key={page}
          className={currentPage === page ? styles.active : ""}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
};

export default Paginator;
