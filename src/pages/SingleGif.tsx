import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gifContext";
import Gif from "./Gif";
import { HiHeart, HiShare } from "react-icons/hi2";

const SingleGif = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGif, setRelatedGif] = useState([]);
  const { gf } = GifState();

  const fetchGif = async () => {
    const gifId = slug?.split("-");
    console.log(gifId[gifId?.length - 1]);
    const { data } = await gf.gif(gifId[gifId?.length - 1]);
    const { data: related } = await gf.related(gifId[gifId?.length - 1], {
      limit: 20,
    });
    setGif(data);
    setRelatedGif(related);
  };

  const handleShareClick = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    fetchGif();
  }, [slug]);

  return (
    <div className="grid grid-cols-4 w-full">
      <div className="col-span-4">
        <div className="flex w-full gap-6 justify-center">
          <div className="w-full md:w-1/2">
            <h1 className="mb-4 font-extrabold text-3xl">{gif?.title}</h1>
            <Gif gif={gif} />
          </div>
          <div className="font-bold text-xl flex gap-4 flex-col cursor-pointer ">
            <span
              className="inline-flex flex-row gap-2 items-center"
              onClick={handleShareClick}
            >
              <HiShare />
              Share
            </span>
            {/* <span className="inline-flex flex-row gap-2 items-center">
              <HiHeart />
              Favorites
            </span> */}
          </div>
        </div>
        <div>
          <p className="my-4 text-2xl font-extrabold">Related Gifs</p>
          <div className="columns-2 md:columns-3 lg:columns-5">
            {relatedGif.length > 0 &&
              relatedGif?.map((gif) => {
                return <Gif gif={gif} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGif;
