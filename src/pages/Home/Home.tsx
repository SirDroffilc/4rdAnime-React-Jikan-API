import "./Home.css";
import { useEffect, useState } from "react";

import Carousel from "../../components/Carousel/Carousel"
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

const animes = [
    { src: onePiece, alt: "One Piece", mal_id: 21, synopsis: "" },
    { src: attackOnTitan, alt: "Attack On Titan", mal_id: 16498, synopsis: "" },
    { src: steinsGate, alt: "Steins Gate", mal_id: 9253, synopsis: "" },
    { src: haikyuu, alt: "Haikyuu", mal_id: 20583, synopsis: "" },
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


function Home() {

    const [carouselAnimes, setCarouselAnimes] = useState<any[]>(animes)
    const [recentAnimes, setRecentAnimes] = useState<any[]>([])
    const [popularAnimes, setPopularAnimes] = useState<any[]>([])

    async function getRecentAnimes() {
        try {
            const url: string = "https://api.jikan.moe/v4/seasons/now"
            const response = await fetch(url)
            const data = await response.json()
            setRecentAnimes(data.data)
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    async function getPopularAnimes() {
        try {
            const url: string = "https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=15"
            const response = await fetch(url)
            const data = await response.json()
            setPopularAnimes(data.data)
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    async function getAllSynopsis() {
        try {
            const updatedAnimeList = [];

            for (const anime of carouselAnimes) {
                try {
                    const url = `https://api.jikan.moe/v4/anime/${anime.mal_id}`;
                    const response = await fetch(url);
                    const data = await response.json();

                    updatedAnimeList.push({
                        ...anime,
                        synopsis: data.data?.synopsis || "No synopsis found",
                    });

                    setCarouselAnimes(updatedAnimeList);

                    await new Promise((res) => setTimeout(res, 334));
                    console.log("synopsis done")

                } catch (error) {
                    console.error("Error fetching data: ", error);
                    updatedAnimeList.push({
                        ...anime,
                        synopsis: "Error fetching synopsis",
                    });
                }
            }

        } catch (error) {
            console.error("Error in getAllSynopsis: ", error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            await getAllSynopsis()
            await getRecentAnimes()
            await new Promise(res => setTimeout(res, 400))
            await getPopularAnimes()
        }
        fetchData()
    }, [])

    return (
        <>
            <Carousel animes={carouselAnimes}/>

            <div className="recent-and-popular-container">
                <div className="recent-animes-container">
                    <ul className="recent-animes-grid">
                        {recentAnimes?.map((anime, i) => (
                            <li key={i}><SearchAnimeResult anime={anime} /></li>
                        ))}
                    </ul>
                </div>
                
                <div className="home-popular-animes-container">
                    <ul className="home-popular-animes-list">
                        {popularAnimes?.map((anime, i) => (
                            <li key={i}><HomePopularAnime anime={anime}></HomePopularAnime></li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Home;
