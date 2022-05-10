import React from "react";
import styles from './SliderPage.module.css'
import {dataSlider} from "./DataSlider";
import img from './Images/img.png'
import img_1 from './Images/img_1.png'
import img_2 from './Images/img_2.png'
import img_3 from './Images/img_3.png'
import img_4 from './Images/img_4.png'

export const SliderPage =()=>{
    return(
        <div className={styles.containerSlider}>
            <img src={img}/>
            {dataSlider.map((item, index) =>{
                return(
                    <div key={item.id} >
                        <img src={require(`./Images/img_${index + 1}.png`)}/>
                    </div>
                )
            })}
        </div>
    )
}