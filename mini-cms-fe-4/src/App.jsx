import { RouterProvider } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import routers from "./routes/Routes";
import "react-phone-input-2/lib/style.css";

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
