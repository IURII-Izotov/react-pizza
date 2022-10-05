import ReactPaginate from "react-paginate";
import React from "react";
import style from './pagination.module.scss'

export const Pagination = ({onChangePage})=>{
    return (
        <>
            <ReactPaginate
                className={style.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={event=> onChangePage(event.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </>
    )
}