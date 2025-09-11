import "./PageButton.css"

function PageButton({ onClick, type }: { onClick: () => void, type: string }) {
    return (
        <button onClick={onClick} className="page-button">
            {type === "previous" ? '❮' : '❯'}
        </button>
    )
}

export default PageButton