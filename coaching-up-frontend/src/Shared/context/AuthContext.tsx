import { useState, createContext, useCallback, useContext, ReactNode } from "react";

interface AuthContextType {
  userId: string | undefined,
  isLoggedIn: boolean,
  login: (uid: string) => void,
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  userId : undefined,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});