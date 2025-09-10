import "./AnimeTrailer.css";
import { FaPlayCircle } from "react-icons/fa";

function AnimeTrailer({ embedUrl }: { embedUrl: string }) {
    return (
        <div className="anime-trailer-container">
            {embedUrl ? (
                <iframe src={embedUrl}></iframe>
            ) : (
                <div className="trailer-alt">
                    <FaPlayCircle className="trailer-play-icon"/>
                    <p>Trailer Not Available</p>
                </div>
            )}
        </div>
    );
}

export default AnimeTrailer;
