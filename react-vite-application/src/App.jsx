import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Belajar from './components/Belajar'

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
    {nama: "Eka", umur: 19, jurusan: "IT"},
    {nama: "Lisa", umur: 20, jurusan: "SI"},
    {nama: "Rudi", umur: 21, jurusan: "IBM"}
  ];

  const prosesMahasiswaX = (mahasiswa) => `${mahasiswa.nama} (${mahasiswa.umur}), ${mahasiswa.jurusan} -- `
  const formatMahasiswaX = mahasiswaX.map(prosesMahasiswaX);

  console.log(formatMahasiswaX);

  // ------------ || ------------
  const kuadrat = (a) => {
    return a*a;
  }

  //console.log(kuadrat(5));

  return (
    <>
      {/* <Belajar /> */}
      {formatMahasiswaX}
    </>
  )
}

export default App
