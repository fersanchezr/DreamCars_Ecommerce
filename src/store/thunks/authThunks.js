import axios from "axios";
import { completEdit, login, logout, setFavorites } from "../slice/auth";

//thunks

export const addFavorite = (carId, userId) => {
  return async (dispatch) => {
    await axios.put(`/api/cars/${userId}`, { id: carId });
    dispatch(getUser(userId));
  };
};

export const removeFavorite = (carId, userId) => {
  return async (dispatch) => {
    await axios.put(`/api/cars/remove-favorite/${userId}`, { id: carId });
    dispatch(getUser(userId));
  };
};

export const getFavorites = (userId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`api/users/${userId}`);
    const favorites = data.favorites;
    dispatch(setFavorites(favorites));
  };
};

export const registerAuth = (formState) => {
  formState.codeAdmin === "dreamcars1"
    ? (formState.codeAdmin = true)
    : (formState.codeAdmin = false);
  return async (dispatch) => {
    await axios.post("/api/users/register", {
      email: formState.email,
      password: formState.password1,
      name: formState.name,
      lastname: formState.lastname,
      admin: formState.codeAdmin,
    });
  };
};
//
export const loginAuth = (...formState) => {
  return async (dispatch) => {
    const { data } = await axios.post(`/api/users/login`, ...formState);
    dispatch(login(data));
    window.localStorage.setItem("sesion", JSON.stringify(data));
  };
};
//
export const validateCookie = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/users/me");
    dispatch(login(data));
  };
};

export const starLogOut = () => {
  return async (dispatch) => {
    const data = await axios.post("/api/users/logout");
    dispatch(logout());
    window.localStorage.removeItem("sesion");
  };
};

export const editAuth = (id, ...formState) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/users/${id}`, ...formState);
    dispatch(completEdit(...formState));
    dispatch(getUser(id));
  };
};

export const getUser = (userId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/users/${userId}`);
    const { id, name, lastname, addres, phone, favorites, carId, email, admin } = data;
    const user = {
      userId: id,
      name: name,
      lastname: lastname,
      email: email,
      phone: phone,
      addres: addres,
      favorites: favorites,
      carId: carId,
      admin: admin
    };
    window.localStorage.setItem("sesion", JSON.stringify(user));
  };
};

// export const login = createAsyncThunk("LOGIN_USER", async () => {
//   try {
//     const loggedUser = await axios.get("/api/user");

//     console.log(loggedUser.payload);
//   } catch (error) {
//     console.log(error);
//   }
// });

//
