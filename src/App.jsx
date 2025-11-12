import React from "react";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
import SearchResult from "./pages/SearchResult";
import TopRatedMovies from "./pages/TopRatedMovies";
import UserWatchList from "./pages/UserWatchList";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/movies", element: <Movies /> },
      { path: "/movies/:id", element: <MovieDetails /> },
      { path: "search", element: <SearchResult /> },
      { path: "top-rated", element: <TopRatedMovies /> },
      { path: "Watchlist", element: <UserWatchList /> },
    ],
  },
]); //Bizim uygulamamızın kök yolu için bir rota tanımlar ve Home bileşenini bu yola bağlar.

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
