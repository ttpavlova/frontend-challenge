import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { FavouritesPage } from "./pages/FavouritesPage";
import { Cat } from "./types";
import "./App.css";

function App() {
    const [favourites, setFavourites] = useState<Cat[]>(getLocalStorageData());

    function getLocalStorageData() {
        const localStorageData = localStorage.getItem("favouriteCats");
        return localStorageData ? JSON.parse(localStorageData) : [];
    }

    useEffect(() => {
        localStorage.setItem("favouriteCats", JSON.stringify(favourites));
    }, [favourites]);

    const handleFavourite = (cat: Cat) => {
        cat.isFavourite = !cat.isFavourite;

        if (cat.isFavourite) {
            setFavourites((prev) => [...prev, cat]);
        } else {
            setFavourites((prev) => prev.filter((item) => item.id !== cat.id));
        }
    };

    return (
        <>
            <HashRouter>
                <Layout>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <HomePage handleFavourite={handleFavourite} />
                            }
                        />
                        <Route
                            path="/favourites"
                            element={
                                <FavouritesPage
                                    favourites={favourites}
                                    handleFavourite={handleFavourite}
                                />
                            }
                        />
                    </Routes>
                </Layout>
            </HashRouter>
        </>
    );
}

export default App;
