import { GiphyFetch } from "@giphy/js-fetch-api";
import { ReactNode, createContext, useContext, useState } from "react";

interface GifProviderProps {
  children: ReactNode;
}

type FilterProps = "gifs" | "stickers" | "text";

const GifCtx = createContext<any>({});

const GifProvider: React.FC<GifProviderProps> = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filters, setFilters] = useState<FilterProps>("gifs");

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  return (
    <GifCtx.Provider
      value={{
        gf,
        gifs,
        filters,
        setGifs,
        setFilters,
      }}
    >
      {children}
    </GifCtx.Provider>
  );
};

export const GifState = () => {
  const context = useContext(GifCtx);
  if (!context) {
    throw new Error("useGifContext must be used within a GifProvider");
  }
  return context;
};

export default GifProvider;
