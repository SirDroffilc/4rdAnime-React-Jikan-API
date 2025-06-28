import { useState } from "react"
import steinsGate from "../../assets/steins-gate.jpg"
import onePiece from "../../assets/one-piece.jpg"
import attackOnTitan from "../../assets/attack-on-titan.jpg"
import blackClover from "../../assets/black-clover.jpg"
import hunterxhunter from "../../assets/hunter-x-hunter.jpg"
import haikyuu from "../../assets/haikyuu.jpg"
import codeGeass from "../../assets/code-geass.jpg"
import assassination from "../../assets/assassination-classroom.jpg"
import oregairu from "../../assets/oregairu.jpg"
import magi from "../../assets/magi.jpg"

import "./Home.css"

const images = [
    { src: steinsGate, alt: "Steins Gate" },
    { src: onePiece, alt: "One Piece" },
    { src: attackOnTitan, alt: "Attack On Titan" },
    { src: blackClover, alt: "Black Clover" },
    { src: hunterxhunter, alt: "Hunter x Hunter" },
    { src: haikyuu, alt: "Haikyuu" },
    { src: codeGeass, alt: "Code Geass" },
    { src: assassination, alt: "Assassination Classroom" },
    { src: oregairu, alt: "Oregairu" },
    { src: magi, alt: "Magi" },
]

function Home() {

    const [currentIndex, setCurrentIndex] = useState(0)

    function nextSlide() {
        setCurrentIndex((currentIndex + 1) % images.length)
    }

    function prevSlide() {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length)
    }

    return (
        <div className="home-container">
            <div className="carousel">
                <div className="carousel-slides">
                    {images.map((image, index) => (
                        <img 
                            key={index} 
                            src={image.src} 
                            alt={image.alt} 
                            className={`slide ${index === currentIndex ? "active" : ""}`}
                        />
                    ))}
                </div>
                <button className="prev" onClick={prevSlide}>&#10094;</button>
                <button className="next" onClick={nextSlide}>&#10095;</button>
            </div>

        </div>
    )
}

export default Home