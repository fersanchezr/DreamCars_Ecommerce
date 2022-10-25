import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { starLogOut } from "../store/thunks/authThunks";

export const ButtonProfile = ({ name }) => {
  const dispatch = useDispatch();

  const handleLogOut = (event) => {
    dispatch(starLogOut());
  };

  return (
    <div>
      <Nav class="ms-auto  bd-highlight">
        <Link to="/profile">
          <button type="button" className="btn btn-secondary m-1">
            {name}
          </button>
        </Link>

        <Link to="/">
          <button
            onClick={handleLogOut}
            type="button"
            className="btn btn-secondary m-1"
          >
            logout
          </button>
        </Link>
      </Nav>
    </div>
  );
};
