"use client";

import useSearchContext from "@/app/hooks/useSearchContext";

function SearchForm() {
  const { petSearch, handleChangeSearch } = useSearchContext();
  return (
    <form className="w-ful h-full">
      <input
        type="search"
        placeholder="Search pets"
        className="w-full h-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50"
        value={petSearch}
        onChange={(e) => handleChangeSearch(e.target.value)}
      />
    </form>
  );
}

export default SearchForm;
