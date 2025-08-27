import "./Carousel.css"
import { useState } from "react";

    interface Anime {
        mal_id: number;
        title?: string;
        alt?: string;
        src: string;
        synopsis?: string | null;
    }

function Carousel({ animes, loading }: { animes: Anime[], loading: boolean }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    function nextSlide() {
        setCurrentIndex((currentIndex + 1) % animes.length);
    }

    function prevSlide() {
        setCurrentIndex(
            (currentIndex - 1 + animes.length) % animes.length
        );
    }

    return (
        <div className="home-container">
            <div className="carousel">
                <div
                    className="carousel-slides"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {animes.map((anime, index) => (
                        <div className="slide" key={index}>
                            <img src={anime.src} alt={anime.alt} />
                            <div className="info">
                                <div className="text">
                                    <h2>{anime.alt}</h2>
                                    {loading && <p>Loading synopsis...</p>}
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
    )
}

export default Carousel