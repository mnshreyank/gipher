import React, { ChangeEvent, useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const GifSearch = () => {
  const [query, setquery] = useState("");
  const navigate = useNavigate();

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setquery(e.target.value);
  };

  const searchGifs = () => {
    if (query.trim() === "") {
      return;
    }
    navigate(`/search/${query}`);
  };

  return (
    <div className="flex w-full mb-4 relative ">
      <input
        type="text"
        onChange={handleSearchTextChange}
        value={query}
        placeholder="Search Gifs and Stickers"
        className="p-4 w-full rounded rounded-r-none  text-black text-2xl"
      />
      {query && (
        <button className=" absolute bg-gray-300 rounded-full right-20 top-4 text-black p-1">
          <HiMiniXMark size={24} onClick={() => setquery("")} />
        </button>
      )}
      <button
        onClick={searchGifs}
        className=" bg-gradient-to-r from-pink-600 to-pink-700 px-4 rounded rounded-l-none"
      >
        <HiOutlineMagnifyingGlass size={36} className="-scale-x-100" />
      </button>
    </div>
  );
};

export default GifSearch;
