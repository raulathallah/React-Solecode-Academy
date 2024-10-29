import React from "react";
import MahasiswaE3 from "./MahasiswaE3";
class DaftarMahasiswaE3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            pos: 0,
        }
    }  
    
    handleButtonClick = (no) => {
        this.setState({ pos: no } )
    }

    mahasiswas = [
        {id: 1, nama: "Eka", umur: 19, jurusan: "Teknik Informatika"},
        {id: 2, nama: "Lisa", umur: 20, jurusan: "Sistem Informasi"},
        {id: 3, nama: "Rudi", umur: 21, jurusan: "Business management"}
    ];

    render(){
        return (
            <div>
                {this.mahasiswas.map((val, index) => <button onClick={()=>this.handleButtonClick(index)} style={{margin: "15px"}}>{val.nama}</button>)}
                <MahasiswaE3 
                    key={this.mahasiswas[this.state.pos].id} 
                    nama={this.mahasiswas[this.state.pos].nama}
                    jurusan={this.mahasiswas[this.state.pos].jurusan}
                />
            </div>
        )
    }
    
}

export default DaftarMahasiswaE3;