import "./App.css";
import { AddBookForm } from "./components/AddBookForm";
import { BookList } from "./components/BookList";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="container">
      <div>
        <Header />
        <AddBookForm />
        <BookList />
      </div>

      <Footer />
    </div>
  );
}

export default App;
