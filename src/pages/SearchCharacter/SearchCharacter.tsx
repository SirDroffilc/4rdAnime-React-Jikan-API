import {useState} from "react"
import { useQuery } from "@tanstack/react-query"
import SearchBar from "../../components/SearchBar/SearchBar"
import SearchCharacterResult from "../../components/SearchCharacterResult/SearchCharacterResult"
import "./SearchCharacter.css"

function SearchCharacter() {
    const [query, setQuery] = useState<string>("")
    const [pageNumber, setPageNumber] = useState<number>(1)

    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ["searchCharacter", query, pageNumber],
        queryFn: async function () {
            const url: string = `https://api.jikan.moe/v4/characters?q=${query}&page=${pageNumber}`
            const response = await fetch(url)
            if (!response.ok) throw new Error("Failed to fetch characters");
            return response.json();
        },
        staleTime: 1000 * 60
    });

    const searchResults = data?.data ?? [];
    const pageCount = data?.pagination?.last_visible_page ?? 0;

    function handleSearch (query: string){
        setQuery(query)
        setPageNumber(1)
    }

    function handleNextButtonClick() {
        setPageNumber(p => p + 1)
    }

    function renderNextButton() {
        if (pageNumber < pageCount) {
            return (
                <button onClick={handleNextButtonClick} disabled={isLoading || isFetching}>
                    Next
                </button>
            )
        } 
        return null
    }

    return (
        <>
            <div className="search-div">
                <h1 className="website-name">4rdAnime</h1>
                <SearchBar onSearch={handleSearch} filter="character"/>
            </div>

            <div className="search-results-container">
                {isError && <p>Error: {(error as Error).message}</p>}
                <ul className={`search-results-items-grid ${searchResults.length <= 7 ? "few-results-flex" : "" }`}>
                    {searchResults.map((character: any, i: number) => (
                        <li key={i}>
                            <SearchCharacterResult character={character}/>
                        </li>
                    ))}
                </ul>

                {isLoading || isFetching ? <p>Loading...</p> : ""}
                {searchResults.length > 0 ? renderNextButton() : ""}
            </div>
        </>
    )
}

export default SearchCharacter