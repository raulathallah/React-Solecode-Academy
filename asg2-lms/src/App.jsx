import "./App.css";
import { Book } from "./components/Books/Book";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div
        className="container d-flex flex-column justify-content-center"
        style={{ width: "40%" }}
      >
        <Book />
      </div>
      <Footer />
    </div>
  );
}

export default App;
