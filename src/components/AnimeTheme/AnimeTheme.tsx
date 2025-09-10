import "./AnimeTheme.css"
import { FaMusic } from "react-icons/fa";

function AnimeTheme({ theme, type } : { theme: string, type: string} ) {
    return (
        <div className="anime-theme-container">
            <div className="theme-icon-wrapper">
                <FaMusic className="theme-music-icon"/>
            </div>
            
            <p className="theme-title">({type}) {theme}</p>
        </div>
    )
}

export default AnimeTheme