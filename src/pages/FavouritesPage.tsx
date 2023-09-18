import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { Cat } from "../types";

interface FavouritesPageProps {
    favourites: Cat[];
    handleFavourite: (cat: Cat) => void;
}

export const FavouritesPage = ({
    favourites,
    handleFavourite,
}: FavouritesPageProps) => {
    if (favourites.length === 0)
        return (
            <div className="wrapper">
                <p>Вы ещё не добавили ни одного котика в избранное</p>
                <Link to="/" role="button" className="btn btn-back-to-main">
                    На главную
                </Link>
            </div>
        );

    return (
        <div className="cards__container">
            {favourites.map((item) => (
                <Card
                    key={item.id}
                    item={item}
                    handleFavourite={handleFavourite}
                />
            ))}
        </div>
    );
};
