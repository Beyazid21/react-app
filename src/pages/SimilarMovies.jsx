import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MovieList from "../components/MovieList";

const api_key = "89aa20fbb4f80528bc1de3764da78721";
const api_url = "https://api.themoviedb.org/3";
const page = 1;

const language = "en-US";
const query = "batman";
const SimilarMovies = ({ movieId }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch(
          `${api_url}/movie/${movieId}/similar?api_key=${api_key}&language=${language}&page=${page}`
        );

        if (!response.ok) {
          throw new Error("Naməlum xəta baş verdi");
        }

        const data = await response.json();
        console.log(data);
        if (data.results) {
          setMovies(data.results);
        }

        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }

    getMovies();
  }, [movieId]);

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
  return <MovieList movies={movies} title="Similar Movies" />;
};

export default SimilarMovies;
