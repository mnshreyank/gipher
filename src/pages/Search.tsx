import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gifContext";
import FilterGifs from "../components/FilterGifs";
import Gif from "./Gif";

const Search: React.FC<{}> = () => {
  const [searchData, setSearchData] = useState<any>([]);
  const { query } = useParams();
  const { gf, filters } = GifState();

  const fetchSearchResult = async () => {
    // if (!query) return;
    const { data } = await gf.search(query, {
      sort: "relavant",
      limit: 20,
      lang: "en",
      type: filters,
    });

    setSearchData(data);
  };

  useEffect(() => {
    fetchSearchResult();
  }, [filters, query]);

  return (
    <div className="my-4">
      <h2 className="text-3xl font-extrabold">{query}</h2>
      <FilterGifs />
      {searchData.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 mt-4">
          {searchData.map((s: any) => {
            return <Gif gif={s} key={s} />;
          })}
        </div>
      ) : (
        <p className="text-2xl font-bold">No gifs found!</p>
      )}
    </div>
  );
};

export default Search;
