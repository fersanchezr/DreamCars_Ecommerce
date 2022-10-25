import React from "react";
import { Link } from "react-router-dom";

export const ButtonAddCar = () => {
  return (
    <div>
      <Link to="/addcar">
        <button type="button" className="btn btn-danger m-1">
          Add Car
        </button>
      </Link>
    </div>
  );
};
