import styles from "../style/Tombol.module.css"
const Tombol = (props)=> {
    
    const handleButtonClick = () => {
        props.onTombolClick(props.children);
    }

    return (
        <button onClick={handleButtonClick} className={styles.tombol}>
            {props.children}
        </button>
    )
}

export default Tombol;