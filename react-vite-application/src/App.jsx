import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Belajar from './components/Belajar'
import { haloJakarta as jkt, haloBandung } from './functions/halo'
import * as sapa from './functions/halo';
import MyComponent from './components/MyComponents'
import DaftarMahasiswaClass from './components/DaftarMahasiswaClass'
import DaftarMahasiswaFunction from './components/DaftarMahasiswaFunction'
import BelajarPropsClass from './components/BelajarPropsClass'
import DaftarMahasiswa from './components/Object Props/DaftarMahasiswa'
import DaftarMahasiswaE1 from './components/Exercise1/DaftarMahasiswaE1'
import DaftarMahasiswaE2 from './components/Exercise2/DaftarMahasiswaE2'
import TombolEO from './components/TombolEventObject'
import TombolEPD from './components/TombolEventPassingDown'
import MyApp from './components/State Class/MyAppClass'
import DaftarMahasiswaE3 from './components/Exercise3/DaftarMahasiswaE3'
import BelajarUseState from './components/BelajarUseState'
import Counter from './components/Exercise4/Counter'
import { UpdateObjectState } from './components/UpdateObjectState'
import { Header } from './components/Header'

function App() {

  // class Laptop {
  //   constructor (milik, merk){
  //     this.milik = milik
  //     this.merk = merk
  //   }
  //   turnOn(){
  //     console.log(`Laptop ${this.milik} turned on!`);
  //   }
  // }

  // var x = new Laptop("raul", "asus");
  // console.log(x)

  // let mahasiswa = {
  //   nama: "Eka",
  //   umur: 19,
  //   jurusan: "Teknik Informatika"
  // }

  // for (var prop in mahasiswa){
  //   console.log(`Nilai ${prop} : ${mahasiswa[prop]}`);
  // }

  // console.log(Object.keys(mahasiswa));
  // console.log(Object.values(mahasiswa));
  // console.log(Object.entries(mahasiswa));

  // let mahasiswaX = ["andi", "lisa", "eko"];
  // let [a, b, c] = mahasiswaX;

  // console.log(a);
  // console.log(c);

  // let {nama, umur} = mahasiswa;
  // console.log(nama);
  // console.log(umur);

  const dataMahasiswa = () => {
    return {nama: "Eka", umur: 19, jurusan: "Informatika"}
  }

  let {nama: mhs_nama, umur: mhs_umur} = dataMahasiswa();

  console.log(mhs_nama);
  console.log(mhs_umur);


  //=== SPREAD OPERATOR ===
  let arr1 = [10,20,30];
  let arr2 = [100,200,300];
  let arr3 = [...arr1, ...arr2];
  let arr4 = [...arr1, 40, 50]
  let arr5 = [1, 5, ...arr1];

  console.log(arr5);

  let mahasiswa1 = {
    nama: "Eka",
    umur: 19,
    jurusan: "Management"
  }

  let mahasiswa2 = {
    ...mahasiswa1,
    umur: 20,
    tempatLahir: "Bandung"
  }

  console.log(mahasiswa2);

  //=== REST OPERATOR ===
  function calculate(...args){
    let total = 0;
    for(let angka of args){
      total += angka;
    }
    return total;
  }

  console.log(calculate(1,2,3));

  let array = [10,20,30,40];

  array.forEach((val, key) => console.log(`Nilai pada index ${key}: ${val}`));
  let arrayKuadrat = array.map((val) => val*val);
  console.log(arrayKuadrat);

  const mahasiswaX = [
    {nama: "Eka", umur: 19, jurusan: "Teknik Informatika"},
    {nama: "Lisa", umur: 20, jurusan: "Sistem Informasi"},
    {nama: "Rudi", umur: 21, jurusan: "Business management"}
  ];

  const prosesMahasiswaX = (mahasiswa) => `${mahasiswa.nama} (${mahasiswa.umur}), ${mahasiswa.jurusan} -- `
  const formatMahasiswaX = mahasiswaX.map(prosesMahasiswaX);

  console.log(formatMahasiswaX);


  const getUser = () => {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve("Rudi");
        reject("Something wrong...")
      }, 2000)
    })
  }
  

  // console.log("Start...");
  // getUser().then((userName)=>console.log(userName)).catch((err)=>console.log(err));
  // console.log("Finish");

  const tryGetName = async ()=> {
    let userName = await getUser();
    console.log(userName);
  }

  console.log("(2)Start...")
  tryGetName();
  console.log("Finish")

  console.log(jkt());
  console.log(haloBandung());
  console.log(sapa.haloJakarta());

  const myElement = <ul style={{textAlign: 'left'}}>{mahasiswaX.map((mhs, i)=> <li key={i}><a href="https://google.com">{`${mhs.nama} (${mhs.umur}), ${mhs.jurusan}`}</a></li>)}</ul>
  const myImage = <img src='public/bg.jpg'/>;
  const fragment = (
    <>
      <h1>TEST</h1>
      <h1>TEST</h1>
      <h1>TEST</h1>
    </>
  )
  let myText ="Belajar React!"
  const myElemetX = 
    (
    <div>
      <h1>{myText}</h1>
      <p>10 + 5 = {10 + 5}</p>
      <span title={myText} style={{color: 'aqua'}}>React Uncover</span>
    </div>
    )

  let nilai = 30;
  let pesan = nilai > 70 ? <p>Congratulations!</p> : <p>Try Again!</p>


  let mahasiswaTable = (
    <table>
      <tr>
        <th>Nama</th>
        <th>Umur</th>
        <th>Jurusan</th>
      </tr>
        {mahasiswaX.map((value) =>
          <tr id="data" onClick={() => alert(`Nama: ${value.nama} (${value.umur}), Jurusan: ${value.jurusan}`)}>
            <td>{value.nama}</td>
            <td>{value.umur}</td>
            <td>{value.jurusan}</td>
          </tr>
        )}
    </table>
  )
  
  // ------------ || ------------
  const kuadrat = (a) => {
    return a*a;
  }

  //console.log(kuadrat(5));

  const handleEPDClick = () => {
    alert("Event Passing Down");
  }

  const [view, setView] = useState('exercise1');

  const renderView = () => {
    switch(view){
      case 'exercise1':
        return <DaftarMahasiswaE1 />
      case 'exercise4':
        return <Counter />
    }
  }

  const foo = useRef("Hei");
  const handleButtonClickFoo = () => {
    foo.current = "Hello";
    console.log(foo.current);

  }
  console.log(foo.current);
  return (
    <>
      {/* <Belajar />
      {formatMahasiswaX}
      {myElement}
      {myImage}
      {fragment}
      {myElemetX}
      {nilai}
      {pesan}
      {mahasiswaTable} */}


      {/* <MyComponent />
      <DaftarMahasiswaClass />
      <DaftarMahasiswaFunction />
      <BelajarPropsClass materi={"JavaScript"} /> */}

      {/* <DaftarMahasiswa /> */}
      {/* <DaftarMahasiswaE1 /> */}
      {/* {myElement} */}

      {/* <DaftarMahasiswaE2 /> */}
      {/* <TombolEO>Tombol Event Object</TombolEO>
      <TombolEPD onTombolClick={handleEPDClick}>Tombol Event Passing Down</TombolEPD> */}
      {/* <MyApp /> */}
      {/* <DaftarMahasiswaE3 />
      <BelajarUseState /> */}
      {/* <Counter /> */}
      {/* <UpdateObjectState /> */}
      

      {/* <Header setView={setView}/>
      <div style={{width: "500px"}}>
        {renderView()}
      </div> */}
      <button onClick={() => handleButtonClickFoo()}>change foo</button>
    </>
  )
}

export default App
