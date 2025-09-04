import "./TopAnimeResult.css"

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

function TopAnimeResult({ anime }: { anime: Anime }) {
    return (
        <div className="top-anime-result-container">

            <div className="top-anime-result-title-section">
                <h1 id="top-anime-title">{anime.title}</h1>
                <h1 id="top-anime-rank">#{anime.rank}</h1>
            </div>

            <div className="top-anime-result-details-section">
                <div className="top-anime-type">
                    <p>{anime.type}</p>
                </div>

                <div className="top-anime-episodes">
                    <p>{anime.episodes}</p>
                </div>
                
                {anime.genres?.slice(0, 3).map((genre) => (
                    <div className="top-anime-genre"> 
                        <p>{genre.name}</p>
                    </div>
                ))}

                <div className="top-anime-score">
                    <p>{anime.score}</p>
                </div>
            </div>

            <div className="top-anime-result-image-section">
                <img src={anime.images.webp.large_image_url} alt={anime.title} className="top-anime-img"/>
                <p className="top-anime-synopsis">{anime.synopsis}</p>
            </div>
        </div>
    );
}

export default TopAnimeResult;
