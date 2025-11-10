import WatchListMovie from "./WatchListMovie.jsx";

export default function WatchList({
  watchListMovies,
  isWatchListOpen,
  onHandleRemoveFromWatchList,
}) {
  if (!isWatchListOpen) {
    return null;
  }
  return (
    <div className=" my-3">
      <div className="card">
        <div className="card-header">
          <h2 className="title h5 mb-0">Watch List</h2>
        </div>

        <div className="card-body">
          {watchListMovies.length == 0 ? (
            <div>Film tapılmadı</div>
          ) : (
            <div
              id="movie-list"
              className="row row-cols-3 row-cols-md-4 row-cols-lg-6 g-1 g-lg-3"
            >
              {watchListMovies.map((movie, index) => (
                <WatchListMovie
                  key={index}
                  movieObj={movie}
                  onHandleRemoveFromWatchList={onHandleRemoveFromWatchList}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
