


export const FavoriteButton = ({ car, isFavorite, handleFavorite }) =>
    isFavorite ? (
        <button
            type="button"
            className="btn btn-primary m-1"
            id={`favoritesSwitchCheck${car.id}`}
            onClick={handleFavorite}
        >
            <span className="bi bi-star-fill"></span> In my Dreams
        </button>
    ) : (
        <button
            type="button"
            className="btn btn-primary m-1"
            id={`favoritesSwitchCheck${car.id}`}
            onClick={handleFavorite}
        >
            <span className="bi bi-star"></span> Not in my Dreams
        </button>
    );