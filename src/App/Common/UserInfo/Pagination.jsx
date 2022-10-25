export const Pagination = ({itemsCount, pageSize, currentPage, onPageChange}) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {currentPage > 1 &&
                        <li className="page-item">
                            <div className="page-link" aria-label="Previous"
                               onClick={() => onPageChange(currentPage - 1)} role={"button"}>
                                <span aria-hidden="true">&laquo;</span>
                            </div>
                        </li>}
                    {pages.map((page) => (
                        <li
                            className={
                                "page-item" +
                                (page === currentPage ? " active" : "")
                            }
                            key={"page_" + page}
                        >
                            <button
                                className="page-link"
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                    {currentPage < pageCount && <li className="page-item">
                        <div className="page-link" aria-label="Next"
                           onClick={() => onPageChange(currentPage + 1)} role={"button"}>
                            <span aria-hidden="true">&raquo;</span>
                        </div>
                    </li>}

                </ul>
            </nav>
        </div>
    )
}