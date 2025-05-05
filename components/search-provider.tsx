// SearchContext.tsx
import { createContext, useContext, useState } from "react";

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  totalPage: number;
  setTotalPage: (page: number) => void;
}

export const SearchContext = createContext<SearchContextType>({
  query: "",
  setQuery: () => {},
  loading: false,
  setLoading: () => {},
  totalPage: 1,
  setTotalPage: () => {},
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        loading,
        setLoading,
        totalPage,
        setTotalPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
