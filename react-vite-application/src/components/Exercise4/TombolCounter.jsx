const TombolCounter = (props) => {
    const handleClick = () => {
    
        if (props.tombolType === "dec")
        {
            props.onTombolClick(-1);
        }
        else 
        {
            props.onTombolClick(+1);
        }
    }
    
    return ( 
        <button style={{margin: "20px"}} onClick={handleClick}>{props.children}</button>
    )
}

export default TombolCounter;