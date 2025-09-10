import "./DetailsCharacter.css"

interface CharacterData {
    character: {
        mal_id: number;
        images: {
            webp: {
                image_url: string;
            };
        };
        name: string;     
    };
    role: string;
    voice_actors: {
        person: {
            images: {
                jpg: {
                    image_url: string;
                };
            };
            name: string;
        };
        language: string;
    }[];
}


function DetailsCharacter({ characterData } : { characterData: CharacterData}) {
    return (
        <div className="details-character-container">
            <img src={characterData.character.images.webp.image_url} alt={characterData.character.name} />
            <div className="character-names-section">
                <p className="character-name">{characterData.character.name}</p>
                <p className="va-name">{characterData.voice_actors[0]?.person.name ?? ""}</p>
            </div>
            
        </div>
    )
}

export default DetailsCharacter