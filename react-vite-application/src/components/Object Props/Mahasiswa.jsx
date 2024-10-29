import React from "react";
class Mahasiswa extends React.Component{
    render(){
        return(
            <figure>
                <figcaption>{this.props.nama} ({this.props.jurusan})</figcaption>
            </figure>
        )
    }
}

export default Mahasiswa;