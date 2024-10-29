import React from "react";
import Mahasiswa from "./Mahasiswa";
class DaftarMahasiswa extends React.Component {
    render(){
        const mahasiswa = {
            nama: "Lisa",
            jurusan: "Sistem Informasi",
            pasFoto: "people2.jpg"
        }

        return (
            <Mahasiswa 
                nama={mahasiswa.nama}
                jurusan={mahasiswa.jurusan}
            />
        )
    }
}
export default DaftarMahasiswa;