import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { useForm } from "../hooks/useForms";
import { validateLogin } from "../utils/validateForm";
import { loginAuth } from "../store/thunks/authThunks";

const UserLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formInitial = {
    email: "",
    password: "",
  };
  const { email, password, formState, onInputChange, onResetForm } =
    useForm(formInitial);

  const errorMessage = validateLogin(email, password);

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(loginAuth(formState));

    navigate("/");
    // axios
    //   .post("/api/users/login", {
    //     email: email,
    //     password: password,
    //   })
    //   .then(() => navigate("/")); // pido crear el user
    // //   .then((res) => setUser(res.data));
  }

  return (
    <div className="container d-flex justify-content-center my-2">
      <Form className="w-75" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter your email"
            name="email"
            value={email}
            onInput={onInputChange}
            isInvalid={errorMessage.email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onInput={onInputChange}
            isInvalid={errorMessage.password1}
          />
        </Form.Group>

        <Button className="mx-1" variant="primary" type="submit">
          Login
        </Button>
        <Button className="mx-1" variant="primary" onClick={onResetForm}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default UserLoginForm;
