import { useState, ChangeEvent, KeyboardEvent} from "react"
import searchIcon from "../../assets/search-icon.png"
import "./SearchBar.css"

interface SearchBarProps {
    onSearch: (query: string) => void
    className?: string
    filter: string
}

function SearchBar({ onSearch, filter} : SearchBarProps) {
    const [query, setQuery] = useState<string>("")

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Enter") {
            e.preventDefault()
            onSearch(query)
        }
    }

    function handleSearchButtonClick() {
        onSearch(query)
    }

    return (
        <div className="search-container">
            <div className="input-wrapper">
                <input 
                    className="search-input"
                    type="text" 
                    value={query}
                    placeholder={`Search for ${filter}... `}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <div className="button-wrapper">
                    <button className="search-button" onClick={handleSearchButtonClick}>
                        <img src={searchIcon} alt="search-icon" />
                    </button>
                </div>
            </div>
        </div>
        
    )
}

export default SearchBar