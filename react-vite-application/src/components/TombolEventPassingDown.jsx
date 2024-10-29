import React from "react";
const TombolEPD = (props) => {
    return (
        <button onClick={props.onTombolClick} style={{margin: "10px"}}>
            {props.children}
        </button>
    )
}

export default TombolEPD;