import { createSlice } from "@reduxjs/toolkit";

//slice

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: false,
    userId: null,
    name: null,
    lastname: null,
    email: null,
    phone: null,
    addres: null,
    admin: null,
    favorites: [],
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = true;
      state.userId = payload.userId;
      state.name = payload.name;
      state.lastname = payload.lastname;
      state.email = payload.email;
      state.phone = payload.phone;
      state.addres = payload.addres;
      state.favorites = payload.favorites;
      state.admin = payload.admin;
    },
    logout: (state, { payload }) => {
      state.status = false;
      state.userId = null;
      state.name = null;
      state.lastname = null;
      state.email = null;
      state.phone = null;
      state.addres = null;
      state.admin = null;
      state.favorites = [];
    },
    edit: (state, { payload }) => {
      state.status = "edit";
    },
    completEdit: (state, { payload }) => {
      state.email = payload.email;
      state.addres = payload.addres;
      state.phone = payload.phone;
      state.status = true;
    },
    setFavorites: (state, { payload }) => {
      state.favorites = payload;
    },
  },
});

export const { login, logout, edit, setFavorites, completEdit } =
  authSlice.actions;
