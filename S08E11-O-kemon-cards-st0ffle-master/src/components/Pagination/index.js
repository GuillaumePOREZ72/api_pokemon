import '../../assets/css/reset.css';
import './style.scss';

const Pagination = ({pagination, setPagination}) => {

    // Récupération du nombre de pages possibles
    const totalPages = Math.ceil(pagination.totalCount / pagination.perPage);
    
    handleChangePerPage = (event) => {
        event.preventDefault();
        setPagination({currentPage: 1, perPage: parseInt(event.target.value)});
    };

    handleChangePage = (event) => {
        event.preventDefault();
        setPagination({...pagination, currentPage: parseInt(event.target.textContent)});
    };

    handlePrevious = (event) => {
        event.preventDefault();
        setPagination({...pagination, currentPage: pagination.currentPage - 1});
    };

    handleNext = (event) => {
        event.preventDefault();
        setPagination({...pagination, currentPage: pagination.currentPage + 1});
    };

    return (
        <div className="pagination">
            <div className="pagination__select">
                <label htmlFor="pagination__select">Nombre de cartes par page</label>
                <select name="pagination__select" id="pagination__select" onChange={handleChangePerPage} defaultValue={pagination.perPage}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div className="pagination__links">
                {
                    pagination.currentPage > 1 && <a onClick={handlePrevious} className="pagination__link pagination__link--previous">Précédent</a>
                }
                
                {
                    (() => {
                        const links = [];
                        if(totalPages > 8) {
                            for (let i = 1; i <= 4; i++) {
                                const classes = "pagination__link" + (pagination.currentPage === i? ' pagination__link--current' : '');
                                
                                links.push(<a key={i} className={classes} onClick={handleChangePage}>{i}</a>);
                            }
                            links.push(<span key="more">...</span>);

                            if(pagination.currentPage > 4 && pagination.currentPage < totalPages - 4) {
                                links.push(<a key={pagination.currentPage} className="pagination__link pagination__link--current" onClick={handleChangePage}>{pagination.currentPage}</a>);
                                links.push(<span key="more">...</span>);
                            }

                            for (let i = totalPages - 3; i <= totalPages; i++) {
                                const classes = "pagination__link" + (pagination.currentPage === i? ' pagination__link--current' : '');
                                
                                links.push(<a key={i} className={classes} onClick={handleChangePage}>{i}</a>);
                            }

                        } else {
                            for (let i = pagination.currentPage; i < totalPages; i++) {
                                const classes = "pagination__link" + (pagination.currentPage === i? ' pagination__link--current' : '');
                                
                                links.push(<a key={i} className={classes} onClick={handleChangePage}>{i}</a>);
                            }
                        }
                        return links;
                    })()
                }
                
                {pagination.currentPage < totalPages && <a onClick={handleNext} className="pagination__link pagination__link--next">Suivant</a>}

            </div>
        </div>

    );
};

export default Pagination;