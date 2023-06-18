"use client";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchInput = () => {
  const [focus, setFocus] = useState(false);
  return (
    <div
      className={`relative flex gap-3 text-secondary-500 text-xl  items-center after:bottom-0 after:transition-all after:h-[1px] after:block after:content-[''] after:absolute  after:bg-secondary-500 after:w-0  ${
        focus && "after:w-full"
      }`}
    >
      <BiSearch />
      <input
        placeholder="Buscar"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className=" placeholder:text-secondary-500 bg-transparent outline-none "
      />
    </div>
  );
};

export default SearchInput;
