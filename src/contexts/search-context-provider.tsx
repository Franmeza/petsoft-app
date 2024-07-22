"use client";

import { createContext, useState } from "react";

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type TSearchContext = {
  petSearch: string;
  handleChangeSearch: (petName: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);
function SearchContextProvider({ children }: SearchContextProviderProps) {
  //states
  const [petSearch, setPetSearch] = useState("");
  //   console.log(petSearch);

  //derived states

  //event handlers / actions
  const handleChangeSearch = (petName: string) => {
    setPetSearch(petName);
  };
  return (
    <SearchContext.Provider value={{ petSearch, handleChangeSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;
