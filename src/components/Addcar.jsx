import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "../hooks/useForms";
import { addCar } from "../store/thunks/carsThunks";

export const Addcar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    model,
    brand,
    year,
    price,
    description,
    img,
    formState,
    onInputChange,
    onResetForm,
  } = useForm();

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(addCar(formState));

    navigate("/");
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>New car</h1>
      <Form className="w-75" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>brand:</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter your brand"
            name="brand"
            value={brand}
            onInput={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>model:</Form.Label>
          <Form.Control
            type="text"
            placeholder="model"
            name="model"
            value={model}
            onInput={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>year:</Form.Label>
          <Form.Control
            type="number"
            placeholder="year"
            name="year"
            value={year}
            onInput={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>price:</Form.Label>
          <Form.Control
            type="number"
            placeholder="price"
            name="price"
            value={price}
            onInput={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="description"
            name="description"
            value={description}
            onInput={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>img:</Form.Label>
          <Form.Control
            type="text"
            placeholder="img"
            name="img"
            value={img}
            onInput={onInputChange}
          />
        </Form.Group>

        <Button className="mx-1" variant="primary" type="submit">
          add car
        </Button>

        <Button className="mx-1" variant="primary" onClick={onResetForm}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};
