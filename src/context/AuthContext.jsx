import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../util/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = getAuthToken();

  //   if (token === "EXPIRED") {
  //     handleLogout();
  //     return;
  //   }

  //   if (token) {
  //     setToken(token);
  //     fetchUserData(token);
  //   }
  // }, []);

  async function fetchUserData(token) {
    try {
      const response = await fetch("http://localhost:8080/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Błąd podczas pobierania danych użytkownika.");
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error(error);
      handleLogout();
    }
  }

  function handleLogout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    navigate("/auth");
  }

  function handleLogin(newToken) {
    setToken(newToken);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("token", newToken);
    localStorage.setItem("expiration", expiration.toISOString());
    fetchUserData(newToken);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAdmin: user?.is_admin,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
