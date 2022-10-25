import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export const ButtonLogin = () => {
  return (
    <div>
      <Nav class="ms-auto  bd-highlight">
        <Link to="/register">
          <button type="button" className="btn btn-secondary m-1">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button type="button" className="btn btn-secondary m-1">
            Login
          </button>
        </Link>
      </Nav>
    </div>
  );
};
