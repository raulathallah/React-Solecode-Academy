import { useState } from "react";
import TombolCounter from "./TombolCounter";

const Counter = () => {
    const [count, setCount] = useState(0);

    const handlePlus = () => {
        let result = count + 1;
        setCount(result);

        //setCount((prev) => {return prev + 1});
    }

    const handleMinus = () => {
        let result = count - 1;
        setCount(result);

        //setCount((prev) => {return prev - 1});
    }

    const handleTombolClick = (change) => {
        setCount((prev) => {return prev + change});
    }
    return (
        <>
            <h1 style={{textAlign:"left"}}>{count}</h1>
            
            {/* <button style={{margin: "15px"}} onClick={handleMinus}>-1</button>
            <button style={{margin: "15px"}} onClick={handlePlus}>+1</button>  */}

            <TombolCounter onTombolClick={handleTombolClick} tombolType="dec">-1</TombolCounter>
            <TombolCounter onTombolClick={handleTombolClick} tombolType="inc">+1</TombolCounter>
        </>
    )
}

export default Counter;