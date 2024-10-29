import React from "react";

const MahasiswaE3 = (props) => {
    return(
        <figure >
            <img style={{width: "200px", height: "200px", objectFit: "cover", borderRadius: "100%"}} src={`/${props.picture}`} alt={props.picture}/>
            <figcaption style={{textAlign: "center"}}>{props.nama}</figcaption>
            <figcaption style={{textAlign: "center"}}>({props.jurusan})</figcaption> 
        </figure>
    )
} 

export default MahasiswaE3;