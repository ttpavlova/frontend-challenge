import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Card } from "../components/Card";
import { Cat } from "../types";

const limit = 15;
const initialPage = 0;
const apiKey = import.meta.env.VITE_API_KEY;
const requestHeaders: HeadersInit = new Headers();
requestHeaders.set("x-api-key", apiKey);

interface HomePageProps {
    handleFavourite: (cat: Cat) => void;
}

export const HomePage = ({ handleFavourite }: HomePageProps) => {
    const {
        data: cats,
        loading,
        error,
        fetchMore,
    } = useFetch<Cat>(limit, initialPage, requestHeaders);

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        fetchMore();

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
            fetchMore();
        }
    };

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
