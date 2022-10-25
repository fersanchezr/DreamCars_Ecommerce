import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import { getCars } from "./store/thunks/carsThunks";
import { login } from "./store/slice/auth";
import { AppRouter } from "./routes/AppRouter";

function App() {
  const dispatch = useDispatch();

  const { status, admin } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCars());
    const local = window.localStorage.getItem("sesion");
    if (local) {
      const user = JSON.parse(local);
      dispatch(login(user));
    }
    // dispatch(validateCookie());
  }, []);

  return (
    <div>
      <Navbar />
      <AppRouter status={status} admin={admin} />
    </div>
  );
}

export default App;
