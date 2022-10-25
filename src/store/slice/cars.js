import { createSlice } from "@reduxjs/toolkit";

//slice
export const carsSlice = createSlice({
  name: "cars",
  initialState: {
    status: false,
    cars: [],
  },
  reducers: {
    setCars: (state, { payload }) => {
      state.status = true;
      state.cars = payload;
    },
  },
});

export const { setCars } = carsSlice.actions;
