import React from "react";
import styles from './Preloader.module.css'

const Preloader = React.memo(()=>{
    return(
    <div className={styles.loaderCircleBody}>
        <div className={styles.loaderCircleWrapper}>
            <div className={styles.loaderCircle}></div>
        </div>
    </div>)
})
export default Preloader