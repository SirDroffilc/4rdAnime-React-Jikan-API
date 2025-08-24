import "./SearchCharacterResult.css"

interface Character {
    mal_id: number
    name: string
    url: string
    favorites: number
    images: {
        webp: {
            image_url: string;
            small_image_url: string;
        };
    };
}

function SearchCharacterResult({ character }: { character: Character}) {
    return(
        <>
            <div className="search-result-item-container">
                <div className="search-result-item-upper">
                    <img className="item-wallpaper"src={character.images.webp.image_url} alt={character.name} />
                    <div className="overlay-info">
                        <div className="item-favorites">
                            <p>{character.favorites} ❤️</p>
                        </div>
                    </div>
                </div>
                
                <div className="search-result-item-info">
                    <p className="info-name">{character.name}</p>
                </div>
            </div>
        </>
    )
}

export default SearchCharacterResult