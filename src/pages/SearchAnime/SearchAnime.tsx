import { useEffect, useState } from "react"
import SearchBar from "../../components/SearchBar/SearchBar.tsx"
import SearchAnimeResult from "../../components/SearchAnimeResult/SearchAnimeResult.tsx"
import "./SearchAnime.css"

function SearchAnime() {

    const [query, setQuery] = useState<string>("")
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [pageCount, setPageCount] = useState<number>(0)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function handleSearch (query: string) {
        setQuery(query)
        setPageNumber(1)
    }

    function renderNextButton() {
        if (pageNumber < pageCount) {
            return (
                <button onClick={handleNextButtonClick} disabled={isLoading}>
                    Next Page
                </button>
            )
        } 
        return null
    }

    function handleNextButtonClick() {
        setPageNumber(p => p + 1)
    }

    
    async function search() {
        setIsLoading(true)
        try {
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

    useEffect(() => {
        search()
    }, [query, pageNumber])

    return (
        <>
            <h1 className="website-name">4rdAnime</h1>
            <SearchBar onSearch={handleSearch} filter="anime"/>
            <div className="search-results-container">
                <ul className={`search-results-items-grid ${searchResults.length <= 7 ? "few-results-flex" : ""}`}>
                    {searchResults.map((anime, i) => (
                        <li key={i}><SearchAnimeResult anime={anime} /></li>
                    ))}
                </ul>

                {isLoading ? <p>Loading...</p> : ""}
                {searchResults.length > 0 ? renderNextButton() : ""}
            
            </div>
        </>
    )
}

export default SearchAnime