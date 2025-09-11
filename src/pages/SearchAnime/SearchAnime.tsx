import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import SearchAnimeResult from "../../components/SearchAnimeResult/SearchAnimeResult.tsx";

import "./SearchAnime.css";
import PageButton from "../../components/PageButton/PageButton.tsx";
function SearchAnime() {
    const [query, setQuery] = useState<string>("");
    const [pageNumber, setPageNumber] = useState<number>(1);

    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ["searchAnime", query, pageNumber], // cache per query & page
        queryFn: async () => {
            const url = `https://api.jikan.moe/v4/anime?q=${query}&page=${pageNumber}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch anime");
            return response.json();
        },
        staleTime: 1000 * 60,
    });

    console.log(data);

    const pageCount = data?.pagination?.last_visible_page ?? 0;
    const searchResults = data?.data ?? [];

    function handleSearch(query: string) {
        setQuery(query);
        setPageNumber(1);
    }

    function handleNextButtonClick() {
        setPageNumber((p) => p + 1);
    }

    function handlePrevButtonClick() {
        setPageNumber((p) => p - 1);
    }

    return (
        <>
            <SearchBar onSearch={handleSearch} filter="anime" />

            <div className="search-results-container">
                {isError && <p>Error: {(error as Error).message}</p>}

                <ul className="search-results-items-grid">
                    {searchResults.map((anime: any, i: number) => (
                        <li key={anime.mal_id ?? i}>
                            <Link to={`/anime/${anime.mal_id}`}>
                                <SearchAnimeResult
                                    anime={anime}
                                    className="large-card"
                                />
                            </Link>
                        </li>
                    ))}
                </ul>

                {isLoading || isFetching ? <p>Loading...</p> : ""}

                <div className="page-buttons-section">
                    {searchResults.length > 0 && pageNumber > 1 && (
                        <PageButton
                            onClick={handlePrevButtonClick}
                            type="previous"
                        />
                    )}
                    {searchResults.length > 0 && pageCount > pageNumber && (
                        <PageButton
                            onClick={handleNextButtonClick}
                            type="next"
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default SearchAnime;
