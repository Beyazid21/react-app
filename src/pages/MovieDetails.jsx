import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import "../index.css";
import SimilarMovies from "./SimilarMovies";

const api_key = "89aa20fbb4f80528bc1de3764da78721";
const api_url = "https://api.themoviedb.org/3";
const language = "en-US";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actors, setActors] = useState([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    async function getMovie() {
      try {
        const response = await fetch(
          `${api_url}/movie/${id}?api_key=${api_key}&language=${language}&append_to_response=credits`
        );
        if (!response.ok) throw new Error("Naməlum xəta baş verdi");

        const data = await response.json();
        setMovie(data);
        setActors(data.credits.cast.slice(0, 12).map((actor) => actor));
        setError("");
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    getMovie();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  function getAllActors(e) {
    e.style = { display: "none" };
    setActors(movie.credits.cast);
    setShowAll(false);
  }

  return (
    <div className="movie-details-page">
      {/*  Background poster */}
      <div
        className="poster-image"
        style={{
          "--poster": `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        }}
      >
        <div className="poster-overlay"></div>

        {/*  Content (üst qat) */}
        <div className="poster-content container py-5 text-white">
          <div className="row align-items-start">
            <div className="col-md-4 mb-4">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                className="img-fluid rounded shadow"
                alt={movie.title}
              />
            </div>

            <div className="col-md-8">
              <h1 className="fw-bold">
                {movie.title}{" "}
                <span className="text-muted">
                  ({movie.release_date.split("-")[0]})
                </span>
              </h1>

              <p className="text-light fs-5 mb-4">
                {movie.release_date} —{" "}
                {movie.genres.map((g) => g.name).join(", ")} • {movie.runtime}{" "}
                min
              </p>

              {/*  Rating */}
              <div className="rating-content d-flex align-items-center gap-3 mb-4">
                <div
                  role="progressbar"
                  style={{ "--value": Math.round(movie.vote_average * 10) }}
                ></div>
                <span className="fs-5">Rating</span>
                <button className="btn btn-outline-light ms-auto">
                  What do you think about this movie?
                </button>
              </div>

              {/*  Overview */}
              <div className="overview mb-5">
                <h3 className="fw-bold">Overview</h3>
                <p className="text-light">{movie.overview}</p>
              </div>

              {/* Creators */}
              <div className="creators d-flex justify-content-between flex-wrap gap-4">
                {movie.credits.crew
                  .filter(
                    (member) =>
                      member.job === "Director" ||
                      member.job === "Writer" ||
                      member.job === "Screenplay"
                  )
                  .slice(0, 3)
                  .map((person, index) => (
                    <div key={index} className="d-flex flex-column">
                      <a
                        href="#"
                        className="fw-bold text-decoration-none text-white"
                      >
                        {person.name}
                      </a>
                      <span className="text-muted">{person.job}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="actors mt-5 posotion-relative">
        <h3 className="text-white mb-3">Top Cast</h3>

        <div className="actors-scroll d-flex gap-5 pb-3">
          {actors.map((actor) => (
            <div
              className="actor-card text-center flex-shrink-0"
              key={actor.id}
            >
              <img
                src={
                  actor.profile_path
                    ? "https://image.tmdb.org/t/p/w200/" + actor.profile_path
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                className="rounded shadow-sm mb-2"
                alt={actor.name}
              />
              <h6 className="text-white mb-0">{actor.name}</h6>
              <small className="text-muted">{actor.character}</small>
            </div>
          ))}

          {showAll && (
            <div className="text-center mt-5">
              <a
                onClick={getAllActors}
                className="show-more-link text-decoration-none "
              >
                Daha çox göstər <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          )}
        </div>
      </div>

      <SimilarMovies movieId={id} />
    </div>
  );
}

// return (
//   <div className="movie-details card my-3">
//     <div className="card-header d-flex justify-content-between align-items-center">
//       <h2 className="h5 mb-0">Movie details</h2>
//       {/* <button className="btn btn-close" onClick={onClose}></button> */}
//     </div>
//     <div className="card-body">
//       <div className="row">
//         <img
//           src={"https://image.tmdb.org/t/p/original/" + movie.backdrop_path}
//           className="img-fluid mb-3"
//           alt=""
//         />

//         <h3>{movie.title}</h3>
//         <p>{movie.overview}</p>
//         <p>
//           <strong>Release Date:</strong> {movie.release_date}
//         </p>
//         <p>
//           <strong>Rating:</strong> {movie.vote_average} / 10
//         </p>
//         {loading && <Loading />}

//         {
//           <div>
//             <p>
//               {" "}
//               <strong>Runtime:</strong> {movie.runtime} minutes
//             </p>
//             <p>
//               <strong>Genres:</strong>{" "}
//               {movie.genres.map((genre) => genre.name).join(", ")}
//             </p>
//             <p>
//               <strong>Tagline:</strong> {movie.tagline}
//             </p>

//             <p>
//               <strong>Country</strong>:{movie.production_countries[0].name}
//             </p>

//             <p>
//               <strong>Budget:</strong> ${movie.budget.toLocaleString()}
//             </p>

//             <p>
//               <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
//             </p>

//             <p>
//               <strong>Senarist</strong> :{" "}
//               {movie.production_companies
//                 .map((company) => company.name)
//                 .join(", ")}
//             </p>

//             <p>
//               <strong>Cast:</strong>{" "}
//               {movie.credits.cast
//                 .slice(0, 5)
//                 .map((actor) => actor.name)
//                 .join(", ")}
//             </p>

//             <p>Actors</p>
//             <div className="row">
//               {movie.credits.cast.slice(0, 6).map((actor) => (
//                 <div className="col-4 mb-3" key={actor.id}>
//                   <div className="card">
//                     <img
//                       src={
//                         actor.profile_path
//                           ? "https://image.tmdb.org/t/p/w200/" +
//                             actor.profile_path
//                           : "https://via.placeholder.com/200x300?text=No+Image"
//                       }
//                       className="card-img-top"
//                       alt={actor.name}
//                     />
//                     <div className="card-body">
//                       <h5 className="card-title">{actor.name}</h5>
//                       <p className="card-text">as {actor.character}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <p>
//               <strong>Director:</strong>{" "}
//               {movie.credits.crew
//                 .filter((member) => member.job === "Director")
//                 .map((director) => director.name)
//                 .join(", ")}
//             </p>
//           </div>
//         }
//       </div>
//     </div>
//   </div>
// );
