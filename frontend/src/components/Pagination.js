
import React, { Fragment } from "react";

function Pagination({
  paginateBack,
  paginateFront,
  resPerPage,
  totalProduct,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProduct / resPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Fragment>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <li>
            <div
              onClick={() => {
                paginateBack();
              }}
              className="cursor-pointer py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            >
              Previous
            </div>
          </li>

          {pageNumbers.map((number) => (
            <li key={number}>
              <div
                onClick={() => {
                  paginate(number);
                }}
                className={
                  currentPage === number
                    ? "cursor-pointer bg-gray-700 text-white hover:bg-gray-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    : "cursor-pointer bg-white border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                }
              >
                {number}
              </div>
            </li>
          ))}

          <li>
            <div
              onClick={() => {
                paginateFront();
              }}
              className="cursor-pointer py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            >
              Next
            </div>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
}

export default Pagination;
