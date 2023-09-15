import { NavLink, useLocation } from "react-router-dom";

export const Navbar = () => {
    const links = [
        { id: 0, path: "/", title: "Все котики" },
        { id: 1, path: "/favourites", title: "Любимые котики" },
    ];

    const { pathname } = useLocation();

    return (
        <nav className="navbar">
            <ul className="navbar__items">
                {links.map((link) => (
                    <li
                        key={link.id}
                        className={
                            "navbar-item " +
                            (pathname === link.path ? "active" : "")
                        }
                    >
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                "navbar-item__link " +
                                (isActive ? "active" : "")
                            }
                        >
                            {link.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
