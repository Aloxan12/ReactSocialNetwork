import React from "react";
import preloader from "../../../assets/images/loader.gif";

const Preloader = React.memo(()=>{
    return <div>
        <img src={preloader}/>
    </div>
})
export default Preloader