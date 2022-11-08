import ReactPaginate from "react-paginate";
import React from "react";
import style from './pagination.module.scss'

type TPaginationProps={
    currentPage:number,
    onChangePage:(page:number)=>void
}
export const Pagination:React.FC<TPaginationProps> = ({currentPage,onChangePage})=>{
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
                forcePage={currentPage-1}
            />
        </>
    )
}