import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState } from "react";

const GifCtx = createContext({});

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filters, setFilters] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  return (
    <GifCtx.Provider
      value={{
        gf,
        gifs,
        filters,
        favorites,
        setGifs,
        setFilters,
        setFavorites,
      }}
    >
      {children}
    </GifCtx.Provider>
  );
};

export const GifState = () => {
  return useContext(GifCtx);
};

export default GifProvider;
