export default function WatchListMovie({ movieObj, removeFromWatchList }) {
  return (
    <div className="col">
      {
        <div className="movie card positon-relative">
          <img
            src={"https://image.tmdb.org/t/p/original/" + movieObj.poster_path}
            className="img-fluid rounded"
            alt=""
          />
          <div className="card-body">
            <h2 className="h5 card-title">{movieObj.title}</h2>
            <p className="card-text mb-0">{movieObj.description}</p>
            {/* {movieObj.is_new && (
              <span className="position-absolute top-0 end-0 badge bg-danger m-1">
                New
              </span>
            )} */}
            <button
              className="btn btn-link fs-5 text-danger position-absolute top-0 start-0"
              onClick={() => removeFromWatchList(movieObj)}
            >
              <i className="bi bi-dash-circle"></i>
            </button>
          </div>
        </div>
      }
    </div>
  );
}
