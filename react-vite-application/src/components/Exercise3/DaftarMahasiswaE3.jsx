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
        {id: 1, nama: "Eka", umur: 19, jurusan: "Teknik Informatika", picture: "ppl1.jpg"},
        {id: 2, nama: "Lisa", umur: 20, jurusan: "Sistem Informasi", picture: "ppl2.jpg"},
        {id: 3, nama: "Rudi", umur: 21, jurusan: "Business management", picture: "ppl3.jpg"}
    ];

    render(){
        return (
            <div>
                <MahasiswaE3 
                    key={this.mahasiswas[this.state.pos].id} 
                    nama={this.mahasiswas[this.state.pos].nama}
                    jurusan={this.mahasiswas[this.state.pos].jurusan}
                    picture={this.mahasiswas[this.state.pos].picture}
                />
                {this.mahasiswas.map((val, index) => <button onClick={()=>this.handleButtonClick(index)} style={{margin: "15px"}}>{val.nama}</button>)}
 
            </div>
        )
    }
    
}

export default DaftarMahasiswaE3;