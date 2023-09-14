import { Card } from "../components/Card";
import { useEffect, useState } from "react";
import { Cat } from "../types";

const limit = 15;
const apiKey = import.meta.env.VITE_API_KEY;
const requestHeaders: HeadersInit = new Headers();
requestHeaders.set("x-api-key", apiKey);

export const HomePage = () => {
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
                    setCats(data);
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
                <Card key={item.id} url={item.url} />
            ))}
        </div>
    );
};
