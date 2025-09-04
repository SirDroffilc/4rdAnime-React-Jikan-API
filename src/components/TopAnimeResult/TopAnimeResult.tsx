import "./TopAnimeResult.css";

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
    members?: number | null;
}

function TopAnimeResult({ anime, filter }: { anime: Anime; filter: string }) {

    function formatNumber(num: number): string {
        if (num < 1000) return num.toString();

        const units: string[] = ["", "K", "M", "B", "T"];
        let unitIndex: number = 0;

        while (num >= 1000 && unitIndex < units.length - 1) {
            num /= 1000;
            unitIndex++;
        }

        // Keep at most 3 significant digits
        let formatted: string= num.toFixed(num >= 100 ? 0 : num >= 10 ? 1 : 2);

        return `${formatted}${units[unitIndex]}`;
    }

    return (
        <div className="top-anime-result-container">
            <div className="top-anime-result-title-section">
                <h1 id="top-anime-title">{anime.title}</h1>
                <h1 id="top-anime-rank">
                    #{filter === "bypopularity" ? anime.popularity : anime.rank}
                </h1>
            </div>

            <div className="top-anime-result-details-section">
                <div className="left-details">
                    <div className="top-anime-type">
                        <p>{anime.type}</p>
                    </div>

                    <div className="top-anime-episodes">
                        <p>{anime.episodes}</p>
                    </div>
                </div>

                <div className="top-anime-genres">
                    {anime.genres?.slice(0, 3).map((genre, i) => (
                        <div className="genre-container" key={i}>
                            <p>{genre.name}</p>
                        </div>
                    ))}
                </div>

                <div className="top-anime-score">
                    <p>{filter === "bypopularity" ? `${formatNumber(anime.members ?? 0)} 🧑‍💻` : `${anime.score} ⭐`}</p>
                </div>
            </div>

            <div className="top-anime-result-image-section">
                <img
                    src={anime.images.webp.large_image_url}
                    alt={anime.title}
                    className="top-anime-img"
                />
                <p className="top-anime-synopsis">{anime.synopsis}</p>
            </div>
        </div>
    );
}

export default TopAnimeResult;
