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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.thecatapi.com/v1/images/search?limit=${limit}`,
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

                    setCats(mapped);
                } else {
                    throw new Error("Failed to fetch");
                }
            } catch (e) {
                setError(true);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: Something went wrong</div>;

    return (
        <div className="cards__container">
            {cats.map((item) => (
                <Card
                    key={item.id}
                    item={item}
                    handleFavourite={handleFavourite}
                />
            ))}
        </div>
    );
};
