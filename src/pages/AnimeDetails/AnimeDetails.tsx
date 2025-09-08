import "./AnimeDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Anime {
    mal_id: number;
    url: string;
    images: {
        webp: {
            large_image_url: string;
        };
    };
    trailer: {
        embed_url: string;
    };
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
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
    studios: {
        mal_id: number;
        type: string;
        name: string;
    }[];
    genres: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    themes: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    demographics: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    theme: {
        openings: [string];
        endings: [string];
    };
}

function AnimeDetails() {
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

    return <div>Anime: {anime.title}</div>;
}

export default AnimeDetails;
