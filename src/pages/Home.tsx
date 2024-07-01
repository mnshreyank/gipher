import { useEffect } from "react";
import { GifState } from "../context/gifContext";
import Gif from "./Gif";
import FilterGifs from "../components/FilterGifs";

const Home = () => {
  const { gifs, setGifs, gf, filters } = GifState();
  const fetchTrendingGifs = async () => {
    const { data } = await gf.trending({
      limit: 30,
      type: filters,
      ratimg: "g",
    });

    setGifs(data);
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, [filters]);

  return (
    <div>
      <img src="/banner.gif" alt="banner" className="w-full rounded h-20" />
      <FilterGifs />
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 mt-4">
        {gifs.map((gif: any) => {
          return <Gif gif={gif} key={gif} />;
        })}
      </div>
    </div>
  );
};

export default Home;
