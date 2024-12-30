import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    console.log("Updating user data", userData);
    setUser(userData);
  };

  const clearUser = () => {
    console.log("Clearing user data");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        isAdmin: user?.is_admin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
