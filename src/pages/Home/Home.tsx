import "./Home.css";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import Carousel from "../../components/Carousel/Carousel";
import SearchAnimeResult from "../../components/SearchAnimeResult/SearchAnimeResult";
import HomePopularAnime from "../../components/HomePopularAnime/HomePopularAnime";

import steinsGate from "../../assets/steins-gate.jpg";
import onePiece from "../../assets/one-piece.jpg";
import attackOnTitan from "../../assets/attack-on-titan.jpg";
import blackClover from "../../assets/black-clover.png";
import hunterxhunter from "../../assets/hunter-x-hunter.jpg";
import haikyuu from "../../assets/haikyuu.jpg";
import codeGeass from "../../assets/code-geass.jpg";
import assassination from "../../assets/assassination-classroom.jpg";
import oregairu from "../../assets/oregairu.jpg";
import magi from "../../assets/magi.jpg";

const baseCarousel = [
    { src: onePiece, alt: "One Piece", mal_id: 21, synopsis: "" },
    { src: attackOnTitan, alt: "Attack On Titan", mal_id: 16498, synopsis: "" },
    { src: steinsGate, alt: "Steins;Gate", mal_id: 9253, synopsis: "" },
    { src: haikyuu, alt: "Haikyuuu!", mal_id: 20583, synopsis: "" },
    { src: hunterxhunter, alt: "Hunter x Hunter", mal_id: 11061, synopsis: "" },
    { src: codeGeass, alt: "Code Geass", mal_id: 1575, synopsis: "" },
    { src: blackClover, alt: "Black Clover", mal_id: 34572, synopsis: "" },
    {
        src: assassination,
        alt: "Assassination Classroom",
        mal_id: 24833,
        synopsis: "",
    },
    { src: oregairu, alt: "Oregairu", mal_id: 14813, synopsis: "" },
    { src: magi, alt: "Magi", mal_id: 14513, synopsis: "" },
];

async function fetchRecentAnimes() {
    const url: string = "https://api.jikan.moe/v4/seasons/now?page=1";
    const response = await fetch(url);
    if (!response.ok) throw new Error("fetchRecentAnimes() error");
    return response.json();
}

async function fetchPopularAnimes() {
    const url: string =
        "https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=20";
    const response = await fetch(url);
    if (!response.ok) throw new Error("fetchPopularAnimes() error");
    return response.json();
}

async function fetchCarouselAnimes() {
    const updatedList: any[] = [];
    for (const anime of baseCarousel) {
        try {
            const url = `https://api.jikan.moe/v4/anime/${anime.mal_id}`;
            const response = await fetch(url);
            if (!response.ok)
                throw new Error(`fetchCarouselAnimes() ${anime.alt} error`);
            const data = await response.json();
            updatedList.push({
                ...anime,
                synopsis: data.data?.synopsis || "No synopsis found",
            });

            await new Promise((resolve) => setTimeout(resolve, 500));
        } catch {
            updatedList.push({ ...anime, synopsis: "Error fetching synopsis" });
        }
    }
    return updatedList;
}

function Home() {
    const {
        data: recentData,
        isLoading: recentLoading,
        error: recentError,
    } = useQuery({
        queryKey: ["recentAnimes"],
        queryFn: fetchRecentAnimes,
        staleTime: 1000 * 60 * 5, // cache 5 min
    });

    const {
        data: popularData,
        isLoading: popularLoading,
        error: popularError,
    } = useQuery({
        queryKey: ["popularAnimes"],
        queryFn: fetchPopularAnimes,
        staleTime: 1000 * 60 * 5,
    });

    const {
        data: carouselData,
        isLoading: carouselLoading,
        error: carouselError,
    } = useQuery({
        queryKey: ["carouselAnimes"],
        queryFn: fetchCarouselAnimes,
        staleTime: 1000 * 60 * 5,
        enabled: !!recentData && !!popularData
    });

    if (recentError || popularError || carouselError)
        return <p>Error fetching data</p>;

    return (
        <>
            <Carousel
                animes={carouselData ?? baseCarousel}
                loading={carouselLoading}
            />

            <div className="recent-and-popular-container">
                <div className="recent-animes-container">
                    <p className="text-category" id="recent-category">
                        Recently Updated
                    </p>
                    <ul className="recent-animes-grid">
                        {recentData?.data?.map((anime: any, i: number) => (
                            <Link to={`/anime/${anime.mal_id}`}>
                                <li key={i}>
                                    <SearchAnimeResult anime={anime} className="small-card"/>
                                </li>
                            </Link>
                        ))}
                    </ul>
                    {recentLoading && (
                        <p className="loading-text">Loading Recent Anime...</p>
                    )}
                </div>

                <div className="home-popular-animes-container">
                    <p className="text-category">Most Popular</p>
                    <ul className="home-popular-animes-list">
                        {popularData?.data?.map((anime: any, i: number) => (
                            <Link to={`/anime/${anime.mal_id}`}>
                                <li key={i}>
                                    <HomePopularAnime
                                        anime={anime}
                                    ></HomePopularAnime>
                                </li>       
                            </Link>
                            
                        ))}
                    </ul>
                    {popularLoading && (
                        <p className="loading-text">Loading Most Popular...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;
