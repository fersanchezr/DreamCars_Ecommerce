import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { getCar, removeCar } from "../store/thunks/carsThunks";
import { FavoriteButton } from "../commons/FavoriteButton";
import { addFavorite, removeFavorite } from "../store/thunks/authThunks";
import axios from "axios";


export const CarDetail = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const params = useParams(); //agarra el id actual del auto

  //redux
  const dispatch = useDispatch();

  const { car, status } = useSelector((state) => state.car); // agarra el estado global del car
  const user = useSelector((state) => state.auth);
  const id = Number(params.id)

  // useEffect para cuando recargue la pagina hace la funcion del store que le pasa por parametros el id actual

  useEffect(() => {
    dispatch(getCar(id))

    user.favorites.forEach((favorite) => {

      if (favorite.id === id) setIsFavorite(true)

    });

  }, [user]);

  const handleFavorite = () => {
    console.log("ISFAV", isFavorite)
    if (isFavorite) {
      setIsFavorite(false);
      console.log(car);
      dispatch(removeFavorite(car.id, user.userId));
    } else {
      dispatch(addFavorite(car.id, user.userId));
      setIsFavorite(true);
    }
  };

  const handleDelete = () => {
    dispatch(removeCar(id))
  }

  const addToCart = () => {
    console.log("USER_ID", user.userId)
    console.log("CAR_ID", car.id)
    axios.put(`/api/cart/${user.userId}`, { id: car.id })
  }

  return (
    <div className="divCenter">

      {status ? (
        <div>
          {" "}
          <h1>
            {" "}
            {car.brand} {car.model}{" "}
          </h1>
          <br />
          <div>
            <img src={car.img[0]} className="img-thumbnail" width={700} alt="..." />

            <h2> $ {car.price} </h2>
            <h4> features: </h4>

            <p> description: {car.description} </p>
            <p> year: {car.year} </p>
            <p> there are {car.user.length} persons that have this car on their dreams</p>
            {user.status ?
              <a href={`/cart/${car.id}`}>
                <button type="button" className="btn btn-primary mx-1" onClick={addToCart}>
                  Add to Cart!
                </button>
              </a> : 
              <a href={`/login`}>
                <button type="button" className="btn btn-primary mx-1">
                  Add to Cart!
                </button>
              </a>}
            <a href={"/"}>
              <button className="btn btn-outline-primary mx-1">Back</button>
            </a>

            {user.status ? <FavoriteButton car={car} isFavorite={isFavorite} handleFavorite={handleFavorite} /> : null}
            {user.admin ?
              <a href="/">
                <button type="button" className="btn btn-danger mx-1" onClick={handleDelete}>Delete car</button>
              </a>

              : ""}
          </div>{" "}
        </div>
      ) : (
        "loading..."
      )
      }

    </div >
  );
};
