import React, { useState } from "react";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }

  const [activePage, setActivePage] = useState(1);

  const handlePageClick = (number) => {
    setActivePage(number);
  };
  return (
    <>
      <div
        className="container overflow-x-auto"
        style={{ overflowY: "hidden" }}
      >
        <nav>
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <>
                <li
                  key={number}
                  className={`page-item ${
                    activePage === number ? "active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => {
                      onPageChange(number);
                      handlePageClick(number);
                    }}
                  >
                    {number}
                  </a>
                </li>
              </>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
