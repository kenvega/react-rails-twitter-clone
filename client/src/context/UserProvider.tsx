import { createContext, useContext, useState, ReactNode } from "react";
import { clearJwt } from "../helpers/jwtHelper";

type UserContextType = {
  userId: number | null;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);

  const logout = () => {
    clearJwt();
    setUserId(null);
  };

  return (
    <UserContext.Provider
      value={{
        userId: userId,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
