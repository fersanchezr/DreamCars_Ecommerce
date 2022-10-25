import { createSlice } from "@reduxjs/toolkit";

//slice
export const carSlice = createSlice({
  name: "car",
  initialState: {
    status: false,
    car: {},
  },
  reducers: {
    setCar: (state, { payload }) => {
      state.status = true;
      state.car = payload;
    },
  },
});

export const { setCar } = carSlice.actions;
