import { useState, createContext, useCallback, useContext, ReactNode } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// export function AuthContextProvider(children : ReactNode) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   // cache app function between re-renders based on dependancies to remove infinite loops
//   const login = useCallback(() => {
//     setIsLoggedIn(true);
//   }, []);

//   const logout = useCallback(() => {
//     setIsLoggedIn(false);
//   }, []);

//   return (
//     <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuthContext() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useContext must be used within AuthContextProvider.");
//   }
//   return context;
// }