import React from "react";
import MahasiswaE2 from "./MahasiswaE2";
const DaftarMahasiswaE2 = () => {
    const mahasiswaX = [
        {id: 1, nama: "Eka", umur: 19, jurusan: "Teknik Informatika"},
        {id: 2, nama: "Lisa", umur: 20, jurusan: "Sistem Informasi"},
        {id: 3, nama: "Rudi", umur: 21, jurusan: "Business management"}
    ];


    return mahasiswaX.map((val) => 
        <MahasiswaE2 key={val.nama} nama={val.nama} jurusan={val.jurusan}/>
    )
}

export default DaftarMahasiswaE2;