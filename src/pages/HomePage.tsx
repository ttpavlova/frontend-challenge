import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Cat } from "../types";

const limit = 15;
const apiKey = import.meta.env.VITE_API_KEY;
const requestHeaders: HeadersInit = new Headers();
requestHeaders.set("x-api-key", apiKey);

interface HomePageProps {
    handleFavourite: (cat: Cat) => void;
}

export const HomePage = ({ handleFavourite }: HomePageProps) => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);

        return function () {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = (e: Event) => {
        const target = e.target as Document;

        if (
            target.documentElement.scrollHeight -
                (target.documentElement.scrollTop + window.innerHeight) <
            100
        ) {
            setLoading(true);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}`,
                    {
                        headers: requestHeaders,
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    const mapped = data.map((item: Cat) => {
                        return {
                            ...item,
                            isFavourite: false,
                        };
                    });

                    setCats((prevItems) => [...prevItems, ...mapped]);
                    setPage((prevPage) => prevPage + 1);
                } else {
                    throw new Error("Failed to fetch");
                }
            } catch (e) {
                setError(true);
            }
            setLoading(false);
        };

        if (loading) {
            fetchData();
        }
    }, [loading]);

    if (error)
        return (
            <div className="wrapper">Ошибка: не удалось загрузить данные</div>
        );

    return (
        <>
            <div className="cards__container">
                {cats.map((item) => (
                    <Card
                        key={item.id}
                        item={item}
                        handleFavourite={handleFavourite}
                    />
                ))}
            </div>
            {loading && <div className="loading-wrapper">Загрузка...</div>}
        </>
    );
};
