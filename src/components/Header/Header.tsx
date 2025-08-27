import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"
import "./Header.css"

function Header() {
    return (
        <header className="header">
            <div className="name-section">
                4rdAnime
            </div>

            <div className="nav-section">
                <nav>
                    <ul>
                        <li>
                            <Link to="/" className="nav-link">Home</Link>
                        </li>

                        <li>
                            <Link to="/search/anime" className="nav-link">Anime</Link>
                        </li>

                        <li>
                            <Link to="/search/character" className="nav-link">Character</Link>
                        </li>

                        <li>
                            <Link to="/top" className="nav-link">Top Anime</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header