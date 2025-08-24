import { useEffect, useState } from "react";
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

import "./Home.css";
    
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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animeList, setAnimeList] = useState(animes);

    function nextSlide() {
        setCurrentIndex((currentIndex + 1) % animeList.length);
    }

    function prevSlide() {
        setCurrentIndex(
            (currentIndex - 1 + animeList.length) % animeList.length
        );
    }

    async function getAllSynopsis() {
        try {
            const updatedAnimeList = [];

            for (const anime of animeList) {
                try {
                    const url = `https://api.jikan.moe/v4/anime/${anime.mal_id}`;
                    const response = await fetch(url);
                    const data = await response.json();

                    updatedAnimeList.push({
                        ...anime,
                        synopsis: data.data?.synopsis || "No synopsis found",
                    });

                    setAnimeList(updatedAnimeList);

                    await new Promise((res) => setTimeout(res, 500));
                } catch (error) {
                    console.error("Error fetching data: ", error);
                    updatedAnimeList.push({
                        ...anime,
                        synopsis: "Error fetching synopsis",
                    });
                }
            }

            setAnimeList(updatedAnimeList);
        } catch (error) {
            console.error("Error in getAllSynopsis: ", error);
        }
    }

    useEffect(() => {
        getAllSynopsis();
    }, []);

    return (
        <div className="home-container">
            <div className="carousel">
                <div
                    className="carousel-slides"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {animeList.map((anime, index) => (
                        <div className="slide" key={index}>
                            <img src={anime.src} alt={anime.alt} />
                            <div className="info">
                                <div className="text">
                                    <h2>{anime.alt}</h2>
                                    <p>{anime.synopsis}</p>
                                </div>
                                <div className="ranking-number">
                                    #{index + 1}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="prev" onClick={prevSlide}>
                    &#10094;
                </button>
                <button className="next" onClick={nextSlide}>
                    &#10095;
                </button>
            </div>
        </div>
    );
}

export default Home;
