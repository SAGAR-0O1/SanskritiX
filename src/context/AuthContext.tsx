import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { api } from "../lib/api";

type User = {
  id?: number;
  email: string;
  name?: string;
  full_name?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: unknown) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("sanskritix_token");

    if (!token) {
      setLoading(false);
      return;
    }

    api.me()
      .then((data: any) => {
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem("sanskritix_token");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email: string, password: string) => {
    const data: any = await api.login(email, password);

    if (data.access_token) {
      localStorage.setItem(
        "sanskritix_token",
        data.access_token
      );
    }

    const loggedInUser = data.user || data;

    setUser(loggedInUser);
  };

  const signup = async (payload: unknown) => {
    const data: any = await api.signup(payload);

    if (data.access_token) {
      localStorage.setItem(
        "sanskritix_token",
        data.access_token
      );
    }

    const signedUpUser = data.user || data;

    setUser(signedUpUser);
  };

  const logout = () => {
    localStorage.removeItem("sanskritix_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
