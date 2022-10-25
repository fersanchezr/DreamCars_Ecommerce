import React from "react";
import { useSelector } from "react-redux";

// import { Link } from "react-router-dom";
import { Card } from "../commons/Card";

export const Grid = () => {
  const { cars } = useSelector((state) => state.cars);

  return (
    <>
      "Welcome to Dreamcars"
      <div className="container-fluid centerGrid">
        
          {cars?.map((car, i) => {
            return <Card car={car} key={car.id} />;
          })}
      
      </div>
    </>
  );
};
