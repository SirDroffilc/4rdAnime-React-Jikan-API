import { ChangeEvent, useEffect, useState } from "react"
import SearchResultItem from "../SearchResultItem/SearchResultItem.tsx"
import "./Search.css"
import searchIcon from "../assets/search-icon.png"


function Search() {

    const [query, setQuery] = useState<string>("")
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [pageCount, setPageCount] = useState<number>(0)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
        setPageNumber(1)
    }

    function renderNextButton() {
        if (pageNumber < pageCount) {
            return (<button onClick={handleNextButtonClick} disabled={isLoading}>Next</button>)
        } 
        return null
    }

    function handleNextButtonClick() {
        setPageNumber(p => p + 1)
    }

    useEffect(() => {
        if (pageNumber > 1) {
            search()
        }
    }, [pageNumber])

    async function search() {
        setIsLoading(true)
        try {
            console.log(`Page Number: ${pageNumber}`)
            const url: string = `https://api.jikan.moe/v4/anime?q=${query}&page=${pageNumber}`
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            setPageCount(data.pagination.last_visible_page)
            setSearchResults(data.data)
        } catch (error) {
            console.error("Error fetching data: ", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="search-container">
                <input 
                    className="search-input"
                    type="text" 
                    value={query}
                    placeholder="Search for anime... "
                    onChange={handleInputChange}
                />
                <button className="search-button" onClick={search} disabled={isLoading}>
                    <img src={searchIcon} alt="search-icon" />
                </button>
            </div>

            <div className="search-results-container">
                <ul className="search-results-items-grid">
                    {searchResults.map((anime, i) => (
                        <li key={i}><SearchResultItem anime={anime} /></li>
                    ))}
                </ul>

                {isLoading && <p>Loading...</p>}
                {searchResults.length > 0 && renderNextButton()}
            
            </div>
        </>
    )
}

export default Search