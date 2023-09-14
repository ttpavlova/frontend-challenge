import bg from "../assets/bg.svg";

export const Card = ({ url }: { url: string }) => {
    return (
        <div className="card">
            <img className="card__bg" src={bg}></img>
            <img className="card__img" src={url} alt="cat image"></img>
            <div className="card__gradient"></div>
        </div>
    );
};
