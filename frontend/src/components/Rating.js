import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function Rating({ value, color }) {
  return (
    <div className="flex gap-1">
      <span>
        <i style={{ color }}>
          {value >= 1 ? (
            <BsStarFill />
          ) : value >= 0.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </i>
      </span>
      <span>
        <i style={{ color }}>
          {value >= 2 ? (
            <BsStarFill />
          ) : value >= 1.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </i>
      </span>
      <span>
        <i style={{ color }}>
          {value >= 3 ? (
            <BsStarFill />
          ) : value >= 2.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </i>
      </span>
      <span>
        <i style={{ color }}>
          {value >= 4 ? (
            <BsStarFill />
          ) : value >= 3.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </i>
      </span>
      <span>
        <i style={{ color }}>
          {value >= 5 ? (
            <BsStarFill />
          ) : value >= 4.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </i>
      </span>

    </div>
  );
}

export default Rating;
