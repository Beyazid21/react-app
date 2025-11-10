import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading";
const api_key = "89aa20fbb4f80528bc1de3764da78721";
const page = 2;

const language = "en-US";
const query = "batman";

export default function MovieDetails({ movieObj, onClose }) {
  const [loadedMovie, setLoadedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getMovieDetails() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieObj.id}?api_key=${api_key}&language=${language}&page=${page}&append_to_response=credits`
        );

        if (!response.ok) {
          throw new Error("Naməlum xəta baş verdi");
        }

        const data = await response.json();

        if (data) {
          setLoadedMovie(data);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
      setLoading(false);
    }

    getMovieDetails();
  }, [movieObj.id]);
  return (
    <div className="movie-details card my-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Movie details</h2>
        <button className="btn btn-close" onClick={onClose}></button>
      </div>
      <div className="card-body">
        <div className="row">
          <img
            src={
              "https://image.tmdb.org/t/p/original/" + movieObj.backdrop_path
            }
            className="img-fluid mb-3"
            alt=""
          />

          <h3>{movieObj.title}</h3>
          <p>{movieObj.overview}</p>
          <p>
            <strong>Release Date:</strong> {movieObj.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movieObj.vote_average} / 10
          </p>
          {loading && <Loading />}

          {loadedMovie && (
            <div>
              <p>
                {" "}
                <strong>Runtime:</strong> {loadedMovie.runtime} minutes
              </p>
              <p>
                <strong>Genres:</strong>{" "}
                {loadedMovie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>
                <strong>Tagline:</strong> {loadedMovie.tagline}
              </p>

              <p>
                <strong>Country</strong>:
                {loadedMovie.production_countries[0].name}
              </p>

              <p>
                <strong>Budget:</strong> ${loadedMovie.budget.toLocaleString()}
              </p>

              <p>
                <strong>Revenue:</strong> $
                {loadedMovie.revenue.toLocaleString()}
              </p>

              <p>
                <strong>Senarist</strong> :{" "}
                {loadedMovie.production_companies
                  .map((company) => company.name)
                  .join(", ")}
              </p>

              <p>
                <strong>Cast:</strong>{" "}
                {loadedMovie.credits.cast
                  .slice(0, 5)
                  .map((actor) => actor.name)
                  .join(", ")}
              </p>

              <p>Actors</p>
              <div className="row">
                {loadedMovie.credits.cast.slice(0, 6).map((actor) => (
                  <div className="col-4 mb-3" key={actor.id}>
                    <div className="card">
                      <img
                        src={
                          actor.profile_path
                            ? "https://image.tmdb.org/t/p/w200/" +
                              actor.profile_path
                            : "https://via.placeholder.com/200x300?text=No+Image"
                        }
                        className="card-img-top"
                        alt={actor.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{actor.name}</h5>
                        <p className="card-text">as {actor.character}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p>
                <strong>Director:</strong>{" "}
                {loadedMovie.credits.crew
                  .filter((member) => member.job === "Director")
                  .map((director) => director.name)
                  .join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
