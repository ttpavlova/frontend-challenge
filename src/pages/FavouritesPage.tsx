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
