import React from "react";
class MahasiswaE1 extends React.Component{
    render(){
        return(
            <figure >
                <figcaption>{this.props.nama} ({this.props.jurusan})</figcaption>
            </figure>
        )
    }
}

export default MahasiswaE1;