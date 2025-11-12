import WatchListMovie from "./WatchListMovie.jsx";

export default function WatchList({ movies, title, removeFromWatchList }) {
  if (!movies) {
    return null;
  }
  return (
    <div className="container py-3">
      <h1 className="mb-3 h4">{title}</h1>
      <div className="card-body">
        {movies.length == 0 ? (
          <div>Film tapılmadı</div>
        ) : (
          <div
            id="movie-list"
            className="row row-cols-3 row-cols-md-4 row-cols-lg-6 g-1 g-lg-3"
          >
            {movies.map((movie, index) => (
              <WatchListMovie
                key={index}
                movieObj={movie}
                removeFromWatchList={removeFromWatchList}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
