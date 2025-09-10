import "./AnimeInfo.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GradientCircleRank from "../../components/GradientCircleRank/GradientCircleRank";
import ScoreStars from "../../components/ScoreStars/ScoreStars";

interface Anime {
    mal_id: number;
    url: string; // x
    images: {
        webp: {
            large_image_url: string;
        };
    };
    trailer: {
        embed_url: string;
    }; // x
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    source: string;
    episodes: number;
    status: string;
    airing: boolean;
    aired: {
        from: string;
        to: string;
    };
    duration: string;
    rating: string;
    score: number; 
    scored_by: number; 
    rank: number; 
    popularity: number; 
    members: number; 
    favorites: number; 
    synopsis: string; 
    season: string; 
    year: number; 
    broadcast: {
        day: string;
        time: string;
        timezone: string;
        string: string;
    };
    producers: {
        mal_id: number;
        type: string;
        name: string;
    }[];
    licensors: {
        mal_id: number;
        type: string;
        name: string;
    }[];
    studios: {
        mal_id: number;
        type: string;
        name: string;
    }[];
    genres: {
        mal_id: number;
        type: string;
        name: string;
    }[];
    themes: {
        mal_id: number;
        type: string;
        name: string;
    }[];
    demographics: {
        mal_id: number;
        type: string;
        name: string;
    }[];
    theme: {
        openings: [string];
        endings: [string];
    }; // x
}

function AnimeInfo() {
    const { id } = useParams<{ id: string }>();
    const [anime, setAnime] = useState<Anime | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchAnime() {
        setLoading(true);
        setError(null);

        try {
            const url = `https://api.jikan.moe/v4/anime/${id}/full`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch anime details");
            const data = await response.json();
            setAnime(data.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAnime();
    }, [id]);

    if (loading) return <p>Loading Anime...</p>;
    if (error) return <h1>Error: {error}</h1>;
    if (!anime) return <h1>No anime found.</h1>;

    return (
        <div className="anime-info-container">
            <div className="info-title-container">
                <h1>{anime.title}</h1>
            </div>

            <div className="info-details-container">
                <div className="details-left-container">
                    <div className="details-left-wallpaper-section">
                        <img
                            src={anime.images.webp.large_image_url}
                            alt={anime.title}
                        />

                        <div className="details-left-genres">
                            {anime.genres.slice(0, 3).map((genre, i) => (
                                <div key={i} className="details-left-genre">
                                    {genre.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="details-left-titles-section">
                        <h2>Alternative Titles</h2>
                        <p>English: {anime.title_english}</p>
                        <p>Japanese: {anime.title_japanese}</p>
                        <p>Synonyms: {anime.title_synonyms.join(", ")}</p>
                    </div>

                    <div className="details-left-info-section">
                        <h2>Information</h2>
                        <p>Type: {anime.type} </p>
                        <p>Episodes: {anime.episodes}</p>
                        <p>Duration: {anime.duration}</p>
                        <p>Genres: {anime.genres.map(g => g.name).join(", ")}</p>
                        <p>Themes: {anime.themes.map(t => t.name).join(", ")} </p>
                        <p>Demographic: {anime.demographics.map(m => m.name).join(", ")}</p>
                        <p>Season: {anime.season.charAt(0).toUpperCase() + anime.season.slice(1).toLowerCase()}</p>
                        <p>Year: {anime.year}</p>
                        <p>Status: {anime.status}</p>
                        <p>
                            Aired:{" "}
                            {new Date(anime.aired.from).toLocaleDateString(
                                "en-US",
                                {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                }
                            )}{" "}
                            to{" "}
                            {new Date(anime.aired.to).toLocaleDateString(
                                "en-US",
                                {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                }
                            )}
                        </p>
                        <p>
                            Broadcast: {anime.broadcast.day} at{" "}
                            {anime.broadcast.time} ({anime.broadcast.timezone})
                        </p>
                        <p>
                            Producers:{" "}
                            {anime.producers.map((p) => p.name).join(", ")}
                        </p>
                        <p> Licensors: {anime.licensors.map(l => l.name).join(", ")} </p>
                        <p> Studios: {anime.studios.map(s => s.name).join(", ")}</p>
                        <p> Source: {anime.source}</p>
                        <p> Rating: {anime.rating}</p>
                    </div>

                    <div className="details-left-stats-section">
                        <h2>Statistics</h2>
                        <p>Score: {anime.score}</p>     
                        <p>Scored by: {anime.scored_by.toLocaleString()}</p>   
                        <p>Rank: #{anime.rank}</p>
                        <p>Popularity: #{anime.popularity}</p>
                        <p>Members: {anime.members.toLocaleString()}</p>
                        <p>Favorites: {anime.favorites.toLocaleString()}</p>

                    </div>

                    {/* 
Type: TV
Episodes: 25
Status: Finished Airing
Aired: Apr 7, 2013 to Sep 29, 2013
Premiered: Spring 2013
Broadcast: Sundays at 01:58 (JST)
Producers: Production I.G, Dentsu, Mainichi Broadcasting System, Pony Canyon, Kodansha, Pony Canyon Enterprises
Licensors: Funimation
Studios: Wit Studio
Source: Manga
Genres: Action, Award Winning, Drama, Suspense
Themes: Gore, Military, Survival
Demographic: Shounen
Duration: 24 min. per ep.
Rating: R - 17+ (violence & profanity) */}
                </div>

                <div className="details-right-container">
                    <div className="details-right-stats-section">
                        <ScoreStars score={anime.score}/>
                        <GradientCircleRank category="Rank" rank={anime.rank} gradientDeg={180}/>
                        <GradientCircleRank category="Popularity" rank={anime.popularity} gradientDeg={0}/>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnimeInfo;
