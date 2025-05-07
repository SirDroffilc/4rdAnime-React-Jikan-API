import {useState, useEffect} from "react"
import SearchBar from "../../components/SearchBar/SearchBar"
import SearchCharacterResult from "../../components/SearchCharacterResult/SearchCharacterResult"
import "./SearchCharacter.css"

function SearchCharacter() {
    const [query, setQuery] = useState<string>("")
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [pageCount, setPageCount] = useState<number>(0)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function handleSearch (query: string){
        setQuery(query)
        setPageNumber(1)
    }

    function renderNextButton() {
        if (pageNumber < pageCount) {
            return (
                <button onClick={handleNextButtonClick} disabled={isLoading}>
                    Next
                </button>
            )
        } 
        return null
    }

    function handleNextButtonClick() {
        setPageNumber(p => p + 1)
    }

    async function search (){
        setIsLoading(true)
        try {
            const url: string = `https://api.jikan.moe/v4/characters?q=${query}&page=${pageNumber}`
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            setPageCount(data.pagination.last_visible_page)
            setSearchResults(data.data)
        } catch (error) {
            console.error("Error fetching data ", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        search()
    }, [query, pageNumber])

    return (
        <>
            <div className="search-div">
                <h1 className="website-name">4rdAnime</h1>
                <SearchBar onSearch={handleSearch} filter="character"/>
            </div>

            <div className="search-results-container">
                <ul className={`search-results-items-grid ${searchResults.length <= 7 ? "few-results-flex" : "" }`}>
                    {searchResults.map((character, i) => (
                        <li key={i}>
                            <SearchCharacterResult character={character}/>
                        </li>
                    ))}
                </ul>

                {isLoading ? <p>Loading...</p> : ""}
                {searchResults.length > 0 ? renderNextButton() : ""}
            </div>
        </>
    )
}

export default SearchCharacter