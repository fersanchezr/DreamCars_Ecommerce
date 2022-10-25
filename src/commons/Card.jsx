import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/thunks/authThunks";
import { FavoriteButton } from "./FavoriteButton";

export const Card = ({ car }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [isFavorite, setIsFavorite] = useState(false);

  // refactorizar para hacer un solo forEach ya que con el del useEffect ya se sabe si es favorito o no el car de la tarjeta

  const handleFavorite = () => {

    console.log("ISFAV", isFavorite)
    if (isFavorite) {
      setIsFavorite(false);
      dispatch(removeFavorite(car.id, user.userId));
    } else {
      setIsFavorite(true);
      dispatch(addFavorite(car.id, user.userId));
    }
  };

  useEffect(() => {

    user.favorites.forEach((favorite) => {
      console.log(isFavorite)
      if (favorite.id === car.id) setIsFavorite(true)
    });

  }, [user]);



  return (
    <>
      <div className="my-2">
        <div className="card cardHeight" style={{ width: "18rem" }}>
          <a href={`http://localhost:3000/car/${car.id}`}>
            <img
              src={car ? car.img[0] : `https://i.imgur.com/M1wbKOT.jpg`}
              className="card-img-top imgSize"
              alt="car Poster"
            />
          </a>
          <div className="card-body">
            <h5 className="card-title">{car.model}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{`Brand: ${car.brand}`}</h6>
            <p className="card-text">{car.description}</p>
            {/* {<DetailsButton />} */}
            <div className="form-check form-switch">
              {/* {isFavorite2 === true ? ( */}

              {user.status ? <FavoriteButton car={car} isFavorite={isFavorite} handleFavorite={handleFavorite} /> : null}

              <a href={`http://localhost:3000/car/${car.id}`}>
                <button className="btn btn-outline-primary" >View Detail</button>
              </a>
              {/* ) : (
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={`favoritesSwitchCheck${mediaElement.id}`}
                  onClick={handleFavorite}
                />
              )} */}
            </div>
          </div>
          <div className="card-footer">
            {/* <small className="text-muted p-2">{`Rating: ${mediaElement.vote_average}`}</small>
            <small className="text-muted p-2">{`Popularity: ${mediaElement.popularity}`}</small> */}
          </div>
        </div>
      </div>
    </>
  );
};
