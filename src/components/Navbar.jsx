import React from "react";
import { useSelector } from "react-redux";

import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { ButtonProfile } from "../commons/ButtonProfile";
import { ButtonLogin } from "../commons/ButtonLogin";
import { ButtonAddCar } from "../commons/ButtonAddCar";

const NavbarHome = () => {
  const { status, name, admin } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Dream Cars</Navbar.Brand>
          {admin ? <ButtonAddCar /> : null}
          {status ? <ButtonProfile name={name} /> : <ButtonLogin />}
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarHome;
