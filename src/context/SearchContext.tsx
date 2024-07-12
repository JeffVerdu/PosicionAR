import { createContext, useState, ReactNode, useEffect } from "react";
import { SearchContextType } from "../types";

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    const storedTerm = localStorage.getItem("searchTerm");
    return storedTerm ? JSON.parse(storedTerm) : "";
  });

  useEffect(() => {
    localStorage.setItem("searchTerm", JSON.stringify(searchTerm));
  }, [searchTerm]);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
