import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { authSlice } from "./slice/auth";
import { carSlice } from "./slice/car";
import { carsSlice } from "./slice/cars";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    auth: authSlice.reducer,
    cars: carsSlice.reducer,
    car: carSlice.reducer,
  },
});

export default store;
