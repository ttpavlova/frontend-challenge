import { useState, useEffect } from "react";

const useFetch = <T>(
    url: string,
    limit: number,
    initialPage: number,
    requestHeaders: HeadersInit
) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(initialPage);

    const fetchMore = () => {
        if (!loading) setLoading(true);
    };

    useEffect(() => {
        if (!loading) return;

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${url}?limit=${limit}&page=${page}`,
                    {
                        headers: requestHeaders,
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    const mapped = data.map((item: T) => {
                        return {
                            ...item,
                            isFavourite: false,
                        };
                    });

                    setData((prevItems) => [...prevItems, ...mapped]);
                    setPage((prevPage) => prevPage + 1);
                } else {
                    throw new Error("Failed to fetch");
                }
            } catch (e) {
                setError(true);
            }
            setLoading(false);
        };

        fetchData();
    }, [loading]);

    return { data, loading, error, fetchMore };
};

export default useFetch;
