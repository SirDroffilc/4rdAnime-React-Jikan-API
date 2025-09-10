import "./ScoreStars.css";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

function getStarFill(score: number, index: number) {
    if (index < Math.floor(score)) return "full";
    if (index < score) return "half";
    return "empty";
    // 0 1 2 3 4
    // f f h e e
}

function ScoreStars({ score }: { score: number }) {
    return (
        <div className="score-star-container">
            <div className="score-left">
                <p className="score-category">Score</p>
                <p className="score-value">{score}</p>
            </div>
            <div className="score-stars">
                {[...Array(10)].map((_, i) => {
                    const fill = getStarFill(score, i);
                    if (fill === "full")
                        return <FaStar key={i} className="star-icon" />;
                    else if (fill === "half")
                        return <FaStarHalfAlt key={i} className="star-icon" />;
                    else return <FaRegStar key={i} className="star-icon" />;
                })}
            </div>
        </div>
    );
}

export default ScoreStars;
