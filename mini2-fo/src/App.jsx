import "./App.css";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { Contact } from "./components/Contact";
import { Customer } from "./components/Customers/Customer";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Menu } from "./components/Menus/Menu";
import { MyCart } from "./components/MyCart";
import { Order } from "./components/Orders/Order";
import { Promotion } from "./components/Promotion";

function App() {
  const location = window.location.pathname;

  let content = <h1 className="blank-h1">HOME PAGE</h1>;

  if (location.includes("menu")) {
    content = <Menu />;
  }
  if (location.includes("order")) {
    content = <Order />;
  }
  if (location.includes("customer")) {
    content = <Customer />;
  }
  if (location.includes("promotion")) {
    content = <Promotion />;
  }
  if (location.includes("contact")) {
    content = <Contact />;
  }
  if (location.includes("login")) {
    content = <Login />;
  }
  if (location.includes("register")) {
    content = <Register />;
  }
  if (location.includes("cart")) {
    content = <MyCart />;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container">{content}</div>
      <Footer />
    </div>
  );
}

export default App;
