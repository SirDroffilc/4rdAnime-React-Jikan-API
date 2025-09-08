import "./GradientCircleRank.css";

function GradientCircleRank({
    category,
    rank,
    gradientDeg,
}: {
    category: string;
    rank: number;
    gradientDeg: number;
}) {
    return (
        <div className={`circle-container deg-${gradientDeg}`}>
            <p className="circle-category">{category}</p>
            <p className="circle-rank">#{rank}</p>
        </div>
    );
}

export default GradientCircleRank;
