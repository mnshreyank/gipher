import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import AppLayout from "./layouts/AppLayout";
import GifProvider from "./context/gifContext";
import SingleGif from "./pages/SingleGif";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/:category", element: <Categories /> },
      { path: "/search/:query", element: <Search /> },
      { path: "/:type/:slug", element: <SingleGif /> },
      { path: "/favorites", element: <Favorites /> },
    ],
  },
]);

function App() {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
}

export default App;
