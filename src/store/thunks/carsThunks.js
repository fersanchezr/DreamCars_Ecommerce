import axios from "axios";
import { setCar } from "../slice/car";
import { setCars } from "../slice/cars";

//thunks
export const getCars = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/cars/");
    dispatch(setCars(data));
  };
};

export const getCar = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/cars/${id}`);
    dispatch(setCar(data));
  };
};

export const addCar = (formState) => {
  return async (dispatch) => {
    const { data } = await axios.post("/api/cars/car", {
      brand: formState.brand,
      model: formState.model,
      year: formState.year,
      price: formState.price,
      description: formState.description,
      img: [formState.img],
    });
    dispatch(getCars());
  };
};

export const removeCar = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/cars/${id}`);
    dispatch(getCars());
  };
};
