import "../styles/Header.css";
import { options } from "../utils/DateOptions";
export const Header = () => {
  const header = {
    title: "Library Management System",
    dateNow: new Date().toLocaleDateString("id-ID", options),
  };

  let { title: NAMA_WEBSITE, dateNow: WAKTU_SEKARANG } = header;

  return (
    <div className="header-container">
      <h2>{NAMA_WEBSITE}</h2>
      <p className="text">{WAKTU_SEKARANG}</p>
    </div>
  );
};
