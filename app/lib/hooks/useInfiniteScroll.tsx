import React, { useCallback, useEffect, useRef, useState } from "react";


type Status = "IDLE" | "LOADING" | "ERROR";

export function useInfiniteScroll<T extends { id: string }>(initialData: { rows: T[]; hasMore: boolean }, scrollElement: React.RefObject<HTMLDivElement>, fetchData: (page: number) => Promise<Response>) {
    const [data, setData] = useState(initialData);
    const [status, setStatus] = useState<Status>("IDLE");
    const [page, setPage] = useState(2);
    const observerRef = useRef<IntersectionObserver>();

    const prependItem = useCallback((newItem: T) => {
        setData(data => {
            const newData = { ...data };
            newData.rows = [newItem, ...data.rows];
            return newData;
        })
    }, []);

    const updateItem = useCallback((updatedItem: T) => {
        setData(data => {
            const newData = { ...data };
            newData.rows = [];
            for (const item of data.rows) {
                if (item.id === updatedItem.id) {
                    newData.rows.push(updatedItem);
                }
                else {
                    newData.rows.push(item);
                }
            }
            return newData;
        })
    }, []);

    const deleteItem = useCallback((id: string) => {
        setData(data => ({ ...data, rows: data.rows.filter(item => item.id !== id) }));
    }, [])

    useEffect(() => {
        if (!data?.hasMore) {
            observerRef.current?.disconnect();
        }
    }, [data]);

    const fetchMore = initialData.rows.length > 0;

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target === scrollElement.current && entry.isIntersecting) {
                    if (status === "IDLE" && fetchMore) {
                        setStatus("LOADING");
                        fetchData(page).then(response => {
                            if (response.ok) {
                                response.json().then(newData =>
                                    setData(data => ({ rows: [...data.rows, ...newData.rows], hasMore: newData.hasMore }))
                                );
                                setPage(page => page + 1);
                                setStatus("IDLE");
                            }
                        }).catch(() => setStatus("ERROR"));
                    }
                }
            })
        }, {
            threshold: 1.0
        });

        observerRef.current = observer;

        if (scrollElement.current && data.hasMore) {
            observer.observe(scrollElement.current);
        }

        return () => {
            observer.disconnect();
        }
    }, [scrollElement, fetchData, fetchMore, status, page, data.hasMore]);

    const isLoading = status === "LOADING";

    return { data, isLoading, prependItem, updateItem, deleteItem };
}