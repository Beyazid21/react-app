import { useEffect, useState } from "react";
import Loading from "../components/Loading";

import MovieList from "../components/MovieList";

import ErrorMessage from "../components/ErrorMessage";

const api_key = "89aa20fbb4f80528bc1de3764da78721";
const api_url = "https://api.themoviedb.org/3";

export default function TopRatedMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch(
          `${api_url}/movie/top_rated?api_key=${api_key}&page=${page}`
        );

        if (!response.ok) {
          throw new Error("Naməlum xəta baş verdi");
        }

        const data = await response.json();
        console.log(data);
        if (data.results) {
          setMovies([...movies, ...data.results]);
        }

        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }

    getMovies();
  }, [page]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <div>
        <ErrorMessage message={error} />
      </div>
    );
  }
  return (
    <div className="text-center">
      <MovieList movies={movies} title="Top rated" />
      <button
        onClick={() => {
          setPage((prevPage) => prevPage + 1);
        }}
        className="btn btn-danger"
      >
        Load More
      </button>
    </div>
  );
}
