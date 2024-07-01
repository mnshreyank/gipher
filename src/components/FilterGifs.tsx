import { GifState } from "../context/gifContext";

const FILTERS = [
  {
    title: "GIFs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];

const FilterGifs = () => {
  const { filters, setFilters } = GifState();

  return (
    <div className="bg-gray-600 ml-auto rounded flex mt-4 text-center">
      {FILTERS.map((f: any) => {
        return (
          <span
            className={`${
              filters === f.value ? f.background : ""
            } font-bold p-2 w-1/3 cursor-pointer rounded`}
            key={f.title}
            onClick={() => setFilters(f.value)}
          >
            {f.title}
          </span>
        );
      })}
    </div>
  );
};

export default FilterGifs;
