import { useQuery } from "@tanstack/react-query";
import TopAnimeResult from "../../components/TopAnimeResult/TopAnimeResult";
import PageButton from "../../components/PageButton/PageButton";
import "./TopAnime.css";
import { useState } from "react";

interface Genre {
    mal_id: number;
    name: string;
    type: string;
    url: string;
}

interface Anime {
    mal_id: number;
    url: string;
    title?: string;
    type?: string | null;
    episodes?: number | null;
    score?: number | null;
    status?: string | null;
    year?: number | null;
    genres?: Genre[];
    images: {
        webp: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
    };
    rank?: string | null;
    popularity?: string | null;
    synopsis?: string | null;
}

function TopAnime() {
    const [pageNumber, setPageNumber] = useState(1);
    const [filter, setFilter] = useState("");

    async function fetchTopAnime() {
        const url: string = `https://api.jikan.moe/v4/top/anime?filter=${filter}&page=${pageNumber}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("fetchTopPopularAnime() error");
        return response.json();
    }

    const {
        data: topAnimeData,
        isLoading: topAnimeLoading,
        error: topAnimeError,
    } = useQuery({
        queryKey: ["topAnime", pageNumber, filter],
        queryFn: fetchTopAnime,
        staleTime: 1000 * 60 * 5,
    });

    const pageCount = topAnimeData?.pagination?.last_visible_page ?? 0;

    function handlePrevButtonClick() {
        setPageNumber((pageNumber) => pageNumber - 1);
    }

    function handleNextButtonClick() {
        setPageNumber((pageNumber) => pageNumber + 1);
    }

    function handleFilterButtonClick(filter: string) {
        setFilter(filter);
    }

    if (topAnimeError) return <p>Error fetching data</p>;

    return (
        <div className="top-anime-container">
            <div className="page-title-section">
                <h1 className="page-title">Top Anime</h1>
                <div className="filter-buttons-container">
                    <button
                        className={`filter-button ${
                            filter === "" ? "selected" : ""
                        }`}
                        onClick={() => handleFilterButtonClick("")}
                    >
                        Top Rated
                    </button>
                    <button
                        className={`filter-button ${
                            filter === "bypopularity" ? "selected" : ""
                        }`}
                        onClick={() => handleFilterButtonClick("bypopularity")}
                    >
                        Most Popular
                    </button>
                </div>
            </div>

            <ul className="top-anime-grid">
                {topAnimeData?.data?.map((anime: Anime, i: number) => (
                    <li key={i}>
                        <TopAnimeResult anime={anime} filter={filter} />
                    </li>
                ))}
            </ul>

            {topAnimeLoading && <p>Loading Top Anime...</p>}

            <div className="page-buttons-section">
                {pageNumber > 1 && !topAnimeLoading && (
                    <PageButton
                        onClick={handlePrevButtonClick}
                        type="previous"
                    />
                )}
                {pageNumber < pageCount && !topAnimeLoading && (
                    <PageButton onClick={handleNextButtonClick} type="next" />
                )}
            </div>
        </div>
    );
}

export default TopAnime;
