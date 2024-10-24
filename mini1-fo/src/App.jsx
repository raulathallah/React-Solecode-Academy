import "./App.css";
import { Customer } from "./components/Customer";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import { Order } from "./components/Order";

function App() {
  const location = window.location.href;
  console.log(location);

  let content = <h1>HOME PAGE</h1>;

  if (location.includes("menu")) {
    content = <Menu />;
  }
  if (location.includes("order")) {
    content = <Order />;
  }
  if (location.includes("customer")) {
    content = <Customer />;
  }

  return (
    <div className="container">
      <div>
        <Header />
        {content}
      </div>
      <Footer />
    </div>
  );
}

export default App;
