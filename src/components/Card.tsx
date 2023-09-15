import { Cat } from "../types";
import bg from "../assets/bg.svg";

interface CardProps {
    item: Cat;
    handleFavourite: (cat: Cat) => void;
}

export const Card = ({ item, handleFavourite }: CardProps) => {
    return (
        <div className="card">
            <img className="card__bg" src={bg}></img>
            <img className="card__img" src={item.url} alt="cat image"></img>
            <div className="card__gradient"></div>
            <div
                className={
                    "card__heart " +
                    (item.isFavourite ? "card__heart_selected" : "")
                }
                onClick={() => handleFavourite(item)}
            ></div>
        </div>
    );
};
