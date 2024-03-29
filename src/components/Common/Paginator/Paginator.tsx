import React, {useState} from "react";
import styles from "./Paginator.module.css";
import cn from 'classnames'

type PaginatorType = {
    pageSize: number
    portionSize?: number
    totalItemCounts: number
    currentPage?: number
    onPageChanged?: (pageNumber: number) => void
}

export const Paginator: React.FC<PaginatorType> = ({totalItemCounts,
                                                                  pageSize,
                                                                  onPageChanged = x => x,
                                                                  currentPage = 1,
                                                                  portionSize = 15}) => {
    let pagesCount = Math.ceil(totalItemCounts / pageSize)

    const pages:number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
     }
    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;
    return (
        <div className={cn(styles.pageBlock)}>
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>Prev</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                return <span key={p} className={ cn({
                    [styles.selectedPage]: currentPage === p
                }) }
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}>{p}</span>
            })}
            {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>Next</button>}
        </div>
    )
}
