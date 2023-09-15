import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar__items">
                <li className="navbar-item">
                    <Link to="/" className="navbar-item__link">
                        Все котики
                    </Link>
                </li>

                <li className="navbar-item">
                    <Link to="/favourites" className="navbar-item__link">
                        Любимые котики
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
