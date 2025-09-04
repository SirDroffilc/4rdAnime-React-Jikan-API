import { useState } from "react"
import { Link } from "react-router-dom"
import "./Header.css"

function Header() {
    const [ isOpen, setIsOpen ] = useState(false)

    function toggleMenu() {
        setIsOpen(prevState => !prevState)


    }
    return (
        <header className="header">
            <div className="name-section">
                4rdAnime
            </div>

            <div className="hamburger-section">
                <button className="hamburger" onClick={toggleMenu}>☰</button>
            </div>

            <div className={`nav-section ${isOpen ? "open" : "close"}`}>
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