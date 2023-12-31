import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/Users";
import { useNavigate } from "react-router-dom";
import { backendRoutes, routes } from "../routes";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signingIn: boolean;
  signedIn: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setUser(JSON.parse(user));
      axios.defaults.headers.common["Authorization"] = token;
    }
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  const signIn = async (handle: string, password: string) => {
    setSigningIn(true);
    try {
      const {
        data: { token, user },
      } = await axios.post(backendRoutes.login, { handle, password });
      axios.defaults.headers.common["Authorization"] = token;
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.log(err);
    } finally {
      setSigningIn(false);
      navigate(routes.home);
    }
  };

  const signOut = async () => {
    localStorage.clear();
    setUser(null);
    axios.defaults.headers.common["Authorization"] = "";
  };

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.data.errors.includes("expired")) {
        signOut();
        navigate(routes.login);
      }
    }
  );

  return (
    <AuthContext.Provider
      value={{
        signedIn: Boolean(user),
        user,
        setUser,
        signIn,
        signOut,
        signingIn,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
export default AuthContext;
