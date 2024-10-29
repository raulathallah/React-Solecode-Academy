import React from "react";

class MyComponent extends React.Component {
    constructor(){
      super();
      this.judulReact = "Belajar React";
    }
  
    judulHurufKecil(){
      return this.judulReact.toLocaleLowerCase();
    }
  
    render(){
      return(
        <>
        <h1>{this.judulReact}</h1>
        <hr />
        <p>Stt... lagi serius {this.judulHurufKecil()}</p>
        </>
      )
    }
  }

export default MyComponent;