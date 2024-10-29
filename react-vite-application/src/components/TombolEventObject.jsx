import React from "react";
class TombolEO extends React.Component{
    handleButtonClick = (event) => {
        console.log(event);
        console.log(event.target);
        console.log(event.target.innerHTML);

    }

    render(){
        return (
            <button onClick={this.handleButtonClick} style={{margin: "10px"}}>
                {this.props.children}
            </button>
        )
    }
}

export default TombolEO;