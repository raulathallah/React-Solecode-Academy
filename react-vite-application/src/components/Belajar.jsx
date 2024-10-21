import { useState } from 'react';
import Tombol from './Tombol'
import styles from "../style/Belajar.module.css"

const Belajar = () => {

    const [judul, setJudul] = useState("React");
    const handleTombolClick = (judul)=> {
      setJudul(judul);
    }
    

    return (
        <>
            <h1 className={styles.judul}>Belajar {judul}</h1>
            <Tombol onTombolClick={handleTombolClick}>React</Tombol>
            <Tombol onTombolClick={handleTombolClick}>JavaScript</Tombol>
        </>

    )
}



export default Belajar;