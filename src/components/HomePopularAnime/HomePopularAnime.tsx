import "./HomePopularAnime.css"

interface Anime {
    mal_id: number;
    url: string;
    title?: string;
    episodes?: number | null;
    rank?: number | null;
    popularity?: number | null;
    images: {
        webp: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
    };
}

function HomePopularAnime({ anime }: { anime: Anime}) {
    return (
        <div className="home-popular-container">
            <p className="home-popular-ranking">{anime.popularity}</p>
            <img className="home-popular-img" src={anime.images.webp.image_url} alt="" />
            <div className="home-popular-info">
                <p className="title">{anime.title}</p>
                <p className="episode">Episodes: {anime.episodes}</p>
            </div>
        </div>
    )
}

export default HomePopularAnime