import axios from "axios";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth";
import { PiupiuRoutes } from "./routes/PiupiuRoutes";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PiupiuRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
