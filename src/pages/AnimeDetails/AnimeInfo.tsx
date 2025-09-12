import "./AnimeInfo.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GradientCircleRank from "../../components/GradientCircleRank/GradientCircleRank";
import ScoreStars from "../../components/ScoreStars/ScoreStars";
import AnimeTrailer from "../../components/AnimeTrailer/AnimeTrailer";
import AnimeTheme from "../../components/AnimeTheme/AnimeTheme";
import DetailsCharacter from "../../components/DetailsCharacter/DetailsCharacter";

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
    background: string;
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
    const [animeLoading, setAnimeLoading] = useState(true);
    const [animeError, setAnimeError] = useState<string | null>(null);
    const [characters, setCharacters] = useState([]);
    const [charactersLoading, setCharactersLoading] = useState(true);
    const [charactersError, setCharactersError] = useState(null);

    async function fetchAnime() {
        setAnimeLoading(true);
        setAnimeError(null);

        try {
            const url = `https://api.jikan.moe/v4/anime/${id}/full`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch anime details");
            const data = await response.json();
            setAnime(data.data);
        } catch (err: any) {
            setAnimeError(err.message);
        } finally {
            setAnimeLoading(false);
        }
    }

    async function fetchCharacters() {
        setCharactersLoading(true);
        setCharactersError(null);

        try {
            const url = `https://api.jikan.moe/v4/anime/${id}/characters`;
            const response = await fetch(url);
            if (!response.ok)
                throw new Error("Failed to fetch anime characters");
            const data = await response.json();
            setCharacters(data.data);
        } catch (err: any) {
            setCharactersError(err.message);
        } finally {
            setCharactersLoading(false);
        }
    }

    useEffect(() => {
        fetchAnime();
        fetchCharacters();
    }, [id]);

    if (animeLoading) return <p>Loading Anime...</p>;
    if (animeError) return <h1>Error: {animeError}</h1>;
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
                        <p>
                            Genres: {anime.genres.map((g) => g.name).join(", ")}
                        </p>
                        <p>
                            Themes: {anime.themes.map((t) => t.name).join(", ")}{" "}
                        </p>
                        <p>
                            Demographic:{" "}
                            {anime.demographics.map((m) => m.name).join(", ")}
                        </p>
                        <p>
                            Season:{" "}
                            {anime.season
                                ? anime.season.charAt(0).toUpperCase() +
                                  anime.season.slice(1).toLowerCase()
                                : "N/A"}
                        </p>
                        <p>Year: {anime.year ?? "N/A"}</p>
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
                            Broadcast:{" "}
                            {anime.broadcast &&
                            anime.broadcast.day &&
                            anime.broadcast.time &&
                            anime.broadcast.timezone
                                ? `${anime.broadcast.day} at ${anime.broadcast.time} (${anime.broadcast.timezone})`
                                : "N/A"}
                        </p>
                        <p>
                            Producers:{" "}
                            {anime.producers.map((p) => p.name).join(", ")}
                        </p>
                        <p>
                            {" "}
                            Licensors:{" "}
                            {anime.licensors.map((l) => l.name).join(", ")}{" "}
                        </p>
                        <p>
                            {" "}
                            Studios:{" "}
                            {anime.studios.map((s) => s.name).join(", ")}
                        </p>
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
                </div>

                <div className="details-right-container">
                    <div className="details-right-stats-section">
                        <ScoreStars score={anime.score} />
                        <div className="stats-circle-ranks">
                            <GradientCircleRank
                                category="Rank"
                                rank={anime.rank}
                                gradientDeg={180}
                            />
                            <GradientCircleRank
                                category="Popularity"
                                rank={anime.popularity}
                                gradientDeg={0}
                            />
                        </div>
                    </div>
                    <div className="details-right-trailer-theme-section">
                        <div className="right-trailer-side">
                            <AnimeTrailer embedUrl={anime.trailer.embed_url} />
                        </div>
                        <div className="right-theme-side">
                            {anime.theme.openings.slice(0, 2).map((op, i) => (
                                <AnimeTheme key={i} theme={op} type="OP" />
                            ))}
                            {anime.theme.endings.slice(0, 2).map((ed, i) => (
                                <AnimeTheme key={i} theme={ed} type="ED" />
                            ))}
                        </div>
                    </div>
                    <div className="details-right-synopsis-section">
                        <h2>Synopsis</h2>
                        <p>{anime.synopsis ? anime.synopsis : "N/A"}</p>
                        <br />
                        <h2>Background</h2>
                        <p>{anime.background ? anime.background : "N/A"}</p>
                    </div>
                    <div className="details-right-characters-section">
                        <h2>Characters and Voice Actors</h2>
                        { charactersLoading ? <p>Loading characters and voice actors...</p> : ""}
                        { charactersError ? <p>Error fetching characters.</p> : ""}
                        <div className="details-characters-grid">
                            {characters.slice(0, 10).map((characterData, i) => (
                                <DetailsCharacter key={i} characterData={characterData} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnimeInfo;
