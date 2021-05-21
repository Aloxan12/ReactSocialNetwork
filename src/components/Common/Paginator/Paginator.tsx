import React from "react";
import styles from "./Paginator.module.css";

type PaginatorType = {
    pageSize: number
    totalUsersCounts: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator = React.memo ((props: PaginatorType) => {
    let pageCount = Math.ceil(props.totalUsersCounts / props.pageSize)

    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }
    return (
            <div className={styles.pageBlock}>
                {pages.map(p => {
                    return <span className={props.currentPage === p ? styles.selectedPage : ""}
                                 onClick={(e) => {
                                     props.onPageChanged(p)
                                 }}>{p}</span>
                })}
            </div>
    )
})