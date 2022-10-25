import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../hooks/useForms";
import { completEdit, login } from "../store/slice/auth";
import { editAuth } from "../store/thunks/authThunks";

const EditProfile = ({ userId, userEmail, userPhone, userAddres }) => {
  const dispatch = useDispatch();
  const initialForm = {
    email: userEmail,
    phone: userPhone,
    addres: userAddres,
  };

  const { email, phone, addres, formState, onInputChange } =
    useForm(initialForm);

  const handleSumbit = (event) => {
    event.preventDefault();
    dispatch(editAuth(userId, formState));
    // dispatch(completEdit(formState));
    // dispatch(login(formState));
  };
  return (
    <div>
      <form onSubmit={handleSumbit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="InputEmail1"
            name="email"
            value={email}
            onInput={onInputChange}
          />
          {/* <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div> */}
        </div>
        <div className="mb-3">
          <label for="phone" className="form-label">
            phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={phone}
            onInput={onInputChange}
          />
        </div>
        <div className="mb-3">
          <label for="addres" className="form-label">
            address
          </label>
          <input
            type="text"
            className="form-control"
            id="addres"
            name="addres"
            value={addres}
            onInput={onInputChange}
          />
        </div>

        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
