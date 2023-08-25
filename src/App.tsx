import axios from "axios";
import "./App.css";
import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home";
import { SinglePiupiu } from "./pages/SinglePiupiu";
import { Login } from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { ProfileLayout } from "./pages/ProfileLayout";
import { AuthProvider } from "./contexts/Auth";
import { RequireAuth } from "./components/RequireAuth";
import { SignUp } from "./pages/SignUp";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<RequireAuth />}>
            <Route path="" element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/*" element={<Home />} />
              <Route path="/piu/:id" element={<SinglePiupiu />} />
              <Route path="/:handle" element={<ProfileLayout />}>
                <Route path="likes" element={<Profile postsRoute="likes" />} />
                <Route path="" element={<Profile postsRoute="posts" />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
