import React from "react";

const mahasiswaX = [
    {id: 1, nama: "Eka", umur: 19, jurusan: "Teknik Informatika"},
    {id: 2, nama: "Lisa", umur: 20, jurusan: "Sistem Informasi"},
    {id: 3, nama: "Rudi", umur: 21, jurusan: "Business management"}
  ];

const Mahasiswa = () => {
    return (
            mahasiswaX.map((val) => <figure key={val.nama}>
                <img src="" alt="" />
                <figcaption > {val.nama} ({val.jurusan})</figcaption>
            </figure>)
    )
}
const DaftarMahasiswaFunction = () => {
        return (
            <>
                <h1>Daftar Mahasiswa - Universitas Ilkom</h1>
                <hr />
                <section style={{display: "flex", textAlign: "center"}}>
                    <Mahasiswa />

                </section>
            </> 
        )
}

export default DaftarMahasiswaFunction;