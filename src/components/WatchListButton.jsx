export default function WatchListButton({
  watchListMovies,
  onSetWatchListOpen,
}) {
  return (
    <div className="mb-2 mb-lg-0 ms-1">
      <button
        onClick={() => onSetWatchListOpen((prevState) => !prevState)}
        className="btn btn-outline-light position-relative"
        type="button"
      >
        <i className="bi bi-heart"></i>
        <span className="positon-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {watchListMovies.length}
        </span>
      </button>
    </div>
  );
}
