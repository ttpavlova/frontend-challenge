export const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar__items">
                <li className="navbar-item">
                    <a href="/" className="navbar-item__link">
                        Все котики
                    </a>
                </li>

                <li className="navbar-item">
                    <a href="/" className="navbar-item__link">
                        Любимые котики
                    </a>
                </li>
            </ul>
        </nav>
    );
};
