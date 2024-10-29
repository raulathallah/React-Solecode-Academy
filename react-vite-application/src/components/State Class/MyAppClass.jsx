import React from "react";
class MyApp extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            judul: {
                satu: "Belajar React",
                dua: "Belajar C#"
            } 
        };
    }

    handleButtonClick = () => {
        if(this.state.judul.satu !== "Belajar Java"){
            this.setState({ judul: {...this.state.judul, satu: "Belajar Java"}})
        }else{
            this.setState({ judul: {...this.state.judul, satu: "Belajar React"}})

        }
    }

    render(){
        return(
            <div> 
                <h1>{this.state.judul.satu}</h1>
                <h1>{this.state.judul.dua}</h1>
                <button onClick={this.handleButtonClick}>Click Me</button>
            </div>
        )
    }
}

export default MyApp;