import { useState, createContext, useCallback, useContext, ReactNode } from "react";

export const LoadingContext = createContext({
    isLoading: true,
    setLoading: () => {},
    setNotLoading: () => {}
});

// export function LoadingContextProvider(children : ReactNode) {
//     const [isLoading, setIsLoading] = useState(true);
//     // cache app function between re-renders based on dependancies to remove infinite loops
//     const loading = useCallback(() => {
//         setIsLoading(true);
//     }, []);
  
//     const notLoading = useCallback(() => {
//         setIsLoading(false);
//     }, []);
  
//     return (
//       <LoadingContext.Provider value={{isLoading: isLoading, setLoading: loading, setNotLoading: notLoading}}>
//         {children}
//       </LoadingContext.Provider>
//     );
//   }
  
//   export function useLoadingContext() {
//     const context = useContext(LoadingContext);
//     if (!context) {
//       throw new Error("useContext must be used within LoadingContextProvider.");
//     }
//     return context;
//   }