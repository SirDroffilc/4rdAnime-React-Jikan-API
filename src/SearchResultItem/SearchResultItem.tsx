import "./SearchResultItem.css"
import playIcon from "../assets/play-icon.png"

interface Anime {
    mal_id: number;
    url: string;
    title?: string;
    type?: string | null;
    episodes?: number | null;
    score?: number | null;
    status?: string | null;
    year?: number | null;
    images: {
        jpg: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
        webp: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
    };
}
function SearchResultItem({ anime }: { anime: Anime}) {
    return(
        <>
            <div className="search-result-item-container">
                <div className="search-result-item-upper">
                    <img className="item-wallpaper"src={anime.images.webp.image_url} alt={anime.title} />
                    <div className="overlay-info">
                        <div className="item-episodes">
                            <img className="play-icon" src={playIcon} alt="play-icon" />
                            <p>{anime.episodes}</p>
                        </div>
                        <div className="item-status">
                            <p>{anime.status}</p>
                        </div>
                    </div>
                </div>
                
                <div className="search-result-item-info">
                    <p className="info-title">{anime.title}</p>
                    <div className="info-details">
                        <p className="info-type">{anime.type} &#183; {anime.year}</p>
                        <p className="info-score">{anime.score} ⭐</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchResultItem