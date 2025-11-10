import React from "react";
import { Link } from "react-router";
export default function Movie({ movieObj }) {
  return (
    <div className="col">
      <div className="movie card positon-relative h-100">
        <Link to={`/movies/${movieObj.id}`}>
          <img
            src={"https://image.tmdb.org/t/p/original/" + movieObj.poster_path}
            className="card-img-top"
            alt=""
          />
        </Link>

        <div className="card-body">
          <h2 className="h5 card-title">{movieObj.title}</h2>
          <p className="card-text mb-0">{movieObj.description}</p>
        </div>
      </div>
    </div>
  );
}
