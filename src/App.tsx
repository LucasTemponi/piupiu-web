import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./contexts/Auth";
import { PiupiuRoutes } from "./routes/PiupiuRoutes";
import { queryClient } from "./service/queryClient";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PiupiuRoutes />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
