import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PurchasesList } from "../commons/PurchasesList";
import { edit } from "../store/slice/auth";
import EditProfile from "./EditProfile";
import { Favorites } from "./Favorites";

export const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const handleEdit = (event) => {
    dispatch(edit());
  };
  // console.log(user.userId);

  return (
    <div>
      Profile
      <div className="card">
        <img src="https://static.wikia.nocookie.net/fastandfurious/images/5/59/Dom_-_Fast9Profile.jpeg" className="card-img-top imgProfile rounded-circle" alt="..." />
        <div className="card-body">
          <h5 className="card-title"> {`${user.name} ${user.lastname}`} </h5>
          {/* <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p> */}
        </div>
        {user.status !== "edit" ? (
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{user.email} </li>
            <li className="list-group-item">{user.phone} </li>
            <li className="list-group-item" > {user.addres} </li >
          </ul >
        ) : (
          <EditProfile
            userId={user.userId}
            userEmail={user.email}
            userphhone={user.phone}
            useraddres={user.addres}
          />
        )}

        <div className="card-body">
          <a onClick={handleEdit} className="card-link">
            Edit profile
          </a>
          {/* <a href="#" className="card-link">
            View favorites
          </a> */}
        </div>
        <PurchasesList user={user} />
        <Favorites user={user} />
      </div >
    </div >
  );
};
