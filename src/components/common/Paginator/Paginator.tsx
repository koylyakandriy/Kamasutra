import React, { useState, FC } from "react";
import styles from "./paginator.module.scss";

type PropsType = {
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  totalItems: number;
  pageSize: number;
  portionSize?: number;
};

const Paginator: FC<PropsType> = ({
  currentPage,
  setCurrentPage,
  totalItems,
  pageSize,
  portionSize = 10,
}) => {
  const pagesCount = Math.ceil(totalItems / pageSize);

  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const [portionNumber, setPortionNumber] = useState(1);
  const portionCount = Math.ceil(pagesCount / portionSize);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  const prevPortionNumber = () => setPortionNumber(portionNumber - 1);
  const nextPortionNumber = () => setPortionNumber(portionNumber + 1);

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && <button onClick={prevPortionNumber}>PREV</button>}
      {pages
        .filter(
          (page) =>
            page >= leftPortionPageNumber && page <= rightPortionPageNumber
        )
        .map((page) => (
          <span
            key={page}
            className={currentPage === page ? styles.active : ""}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </span>
        ))}
      {portionCount > portionNumber && (
        <button onClick={nextPortionNumber}>NEXT</button>
      )}
    </div>
  );
};

export default Paginator;
