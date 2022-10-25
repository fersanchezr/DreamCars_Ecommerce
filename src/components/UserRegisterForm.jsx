import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";

import { registerAuth } from "../store/thunks/authThunks";
import { useForm } from "../hooks/useForms";
import { validateRegister } from "../utils/validateForm";

const UserRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formInitial = {
    name: "",
    lastname: "",
    email: "",
    password1: "",
    password2: "",
  };
  const {
    name,
    lastname,
    email,
    password1,
    password2,
    codeAdmin,
    formState,
    onInputChange,
    onResetForm,
  } = useForm(formInitial);

  const errorMessage = validateRegister(
    name,
    lastname,
    email,
    password1,
    password2
  );

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(registerAuth(formState));
    navigate("/login");
  }

  return (
    <div className="d-flex justify-content-center my-2">
      <Form className="w-75" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            name="name"
            value={name}
            onInput={onInputChange}
            isValid={true}
            isInvalid={errorMessage.name}
          ></Form.Control>
        </Form.Group>
        <p> {errorMessage.name} </p>
        <Form.Group>
          <Form.Label>Lastname:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apellido"
            name="lastname"
            value={lastname}
            onInput={onInputChange}
            isValid={true}
            isInvalid={errorMessage.lastname}
          ></Form.Control>
          <p> {errorMessage.lastname} </p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter your email"
            name="email"
            value={email}
            onInput={onInputChange}
            isValid={true}
            isInvalid={errorMessage.email}
          />
          <p> {errorMessage.email} </p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Password1">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password1"
            value={password1}
            onInput={onInputChange}
            isValid={true}
            isInvalid={errorMessage.password1}
          />
          <p> {errorMessage.password1} </p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Password2">
          <Form.Label>Repeat you password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat you password"
            name="password2"
            value={password2}
            onInput={onInputChange}
            isInvalid={errorMessage.password2}
          />
          <p> {errorMessage.password2} </p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password2">
          <Form.Label>Code admin:</Form.Label>
          <Form.Control
            type="password"
            placeholder="code admin"
            name="codeAdmin"
            value={codeAdmin}
            onInput={onInputChange}
          />
        </Form.Group>
        {codeAdmin === process.env.REACT_APP_CODE_ADMIN ? (
          <Button
            variant="primary"
            type="submit"
            disabled={errorMessage.status}
          >
            Register Admin
          </Button>
        ) : (
          <Button
            disabled={errorMessage.status}
            className="mx-1"
            variant="primary"
            type="submit"
          >
            Register
          </Button>
        )}

        <Button className="mx-1" variant="primary" onClick={onResetForm}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default UserRegisterForm;
