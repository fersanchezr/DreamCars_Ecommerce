import React from 'react'
import { Card } from '../commons/Card';

export const Favorites = ({ user }) => {

    return (
        <>
            "Favorites"
            <div className="container-fluid centerGrid">

                {user.favorites?.map((car, i) => {
                    return <Card car={car} key={car.id} />;
                })}

            </div>
        </>
    );
}
