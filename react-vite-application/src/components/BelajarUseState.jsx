import { useState } from "react"

const BelajarUseState = () => {
    const [judul, setJudul] = useState("Belajar React");

    const handleButtonClick = ()=>{
        if(judul !== "Belajar JavaScript"){
            setJudul("Belajar JavaScript"); 
        }else{
            setJudul("Belajar React");
        }
    }

    return (
        <div>
            <h1>{judul}</h1>
            <button onClick={handleButtonClick}>Click</button>
        </div>
    )
}

export default BelajarUseState;