import axios from "axios";
import "./App.css";
import { Profile } from "./pages/Profile";
import { Main } from "./pages/Main";
import { SinglePiupiu } from "./pages/SinglePiupiu";
import { Login } from "./pages/Login";

axios.defaults.baseURL = "http://192.168.0.43:3000";
axios.defaults.headers.common["Authorization"] =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2OTI3MDc4MDd9.wQmNHjiRb3hXKSnbFwZ2ofe4bbgTgRt5p-Uf2ypbINY";
function App() {
  // return <Login />;
  // return <Main />;
  // return <Profile />;
  return <SinglePiupiu />;
}

export default App;
