import React from 'react';

import './Pagination.scss'

const Pagination = ({onPageChange,activePage}) => {

    const handleNext = () => {
        const newPage = activePage + 1;
        onPageChange(newPage);
    }

    const handlePrevious = () => {
        let newPage = activePage;
        if(activePage>1){
            newPage = activePage - 1;
        }
        onPageChange(newPage);
    }


    return (
        <div className="Pagination">
            <button onClick={handlePrevious}>Previous</button>
            <div>{activePage}</div>
            <button onClick={handleNext}>Next</button>
        </div>  
    )
}

export default Pagination;