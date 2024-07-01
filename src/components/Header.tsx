import { useEffect, useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GifState } from "../context/gifContext";
import GifSearch from "./GifSearch";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCatergories, setshowCatergories] = useState<Boolean>(false);

  const { gf, gifs, filters, setFilters, setGifs, setFavorites, favorites } =
    GifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    console.log(data);
    setCategories(data);
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

  const handleMoreClick = () => {
    // setshowCatergories(true);
    setshowCatergories((prev) => !prev);
  };

  return (
    <header>
      <nav className="relative flex gap-4 items-center justify-between mb-4">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" alt="giphy logo" className="w-10" />
          <h1 className="text-4xl font-bold t">GIPHER</h1>
        </Link>
        <div className="flex flex-row items-center gap-4 text-lg">
          {categories.slice(0, 5)?.map((category) => {
            return (
              <Link
                to={`${category.name_encoded}`}
                key={category.name}
                className="px-4 hover:gradient border-b-4 hidden lg:block"
              >
                {category.name}
              </Link>
            );
          })}

          <button
            // onMouseOver={() => setshowCatergories(true)}
            // onMouseLeave={() => setshowCatergories(false)}
            onClick={handleMoreClick}
          >
            <HiEllipsisVertical
              size={30}
              className={`py-1 hover:gradient border-b-4 hidden ${
                showCatergories ? "gradient" : ""
              } lg:block`}
            />
          </button>
          <div>
            {favorites.length > 0 && (
              <Link to="/favorites" className="rounded px-5 py-2 bg-gray-500">
                Favorites
              </Link>
            )}
          </div>
          <button className="lg:hidden text-sky-400">
            <HiMiniBars3BottomRight size={24} />
          </button>
        </div>
        {showCatergories && (
          <div className="absolute top-14 gradient p-4 w-full rounded flex flex-col gap-1 z-10">
            <span className="text-2xl font-bold">Categories</span>
            <hr className="my-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-lg">
              {categories.map((category) => {
                return (
                  <Link key={category.name} to={`${category.name_encoded}`}>
                    {category?.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
      <GifSearch />
    </header>
  );
};

export default Header;
