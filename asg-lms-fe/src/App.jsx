import { RouterProvider } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { routers } from "./Routes/Routes";

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
