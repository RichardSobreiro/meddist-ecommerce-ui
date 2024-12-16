/** @format */

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface BearerToken {
  username: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface User {
  accessToken: string;
  refreshToken: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const decodeJwt = (token: string) => {
    const base64Url = token.split(".")[1]; // get the payload part
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email: credentials.username,
        password: credentials.password,
      });
      const accessToken: string = response.data.refresh_token;
      const refreshToken: string = response.data.refresh_token;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      const token: BearerToken = decodeJwt(accessToken);
      const username: string = token.username;
      setUser({ accessToken, refreshToken, username });
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Unknown error occurred"
        );
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      const token: BearerToken = decodeJwt(accessToken);
      const username: string = token.username;
      setUser({ accessToken, refreshToken, username });
    } else {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
