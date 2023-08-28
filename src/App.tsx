import axios from "axios";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth";
import { PiupiuRoutes } from "./routes/PiupiuRoutes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./service/queryClient";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PiupiuRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
