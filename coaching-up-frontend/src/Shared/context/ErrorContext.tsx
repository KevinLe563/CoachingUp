import { useState, createContext, useCallback, useContext, ReactNode } from "react";

export const ErrorContext = createContext({
    isError: true,
    setLoading: () => {},
    setNotLoading: () => {}
});