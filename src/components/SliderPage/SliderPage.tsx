import React from "react";
import styles from './SliderPage.module.css'
import {dataSlider} from "./DataSlider";
import img from './Images/img.png'

export const SliderPage =()=>{
    return(
        <div className={styles.containerSlider}>
            <img src={img}/>
            {dataSlider.map((item, index) =>{
                return(
                    <div key={item.id}>
                        <img src={require(`./Images/img_${index + 1}.png`)}/>
                    </div>
                )
            })}
        </div>
    )
}