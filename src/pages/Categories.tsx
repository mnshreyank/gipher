import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gifContext";
import Gif from "./Gif";

const Categories: React.FC<{}> = () => {
  const { category } = useParams();
  const [results, setResults] = useState([]);

  const { gf, filters } = GifState();

  const fetchResults = async () => {
    if (!category) return;
    const { data } = await gf.gifs(category, category);
    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, [category, filters]);

  console.log(category);
  return (
    <div>
      <h2 className="text-3xl font-extrabold">{category} Gifs</h2>
      {/* <FilterGifs /> */}
      {results.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 mt-4">
          {results.map((s) => {
            return <Gif gif={s} key={s} />;
          })}
        </div>
      ) : (
        <p className="text-2xl font-bold">No gifs found!</p>
      )}
    </div>
  );
};

export default Categories;
