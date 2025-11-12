import Movie from "./Movie";

export default function MovieList({ movies, title }) {
  return (
    <div className="container py-3">
      <h1 className="mb-3 h4">{title}</h1>
      {movies.length == 0 ? (
        <div>Film tapılmadı</div>
      ) : (
        <div
          id="movie-list"
          className="row row-cols-3 row-cols-md-4 row-cols-lg-6 g-2"
        >
          {movies.map((movie, index) => (
            <Movie key={index} movieObj={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

//  <div className="container my-3">
//       <div className="card">
//         <div className="card-header">
//           <h2 className="title h5 mb-0">{title}</h2>
//         </div>

//         <div className="card-body">
//           {movies.length == 0 ? (
//             <div>Film tapılmadı</div>
//           ) : (
//             <div
//               id="movie-list"
//               className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4"
//             >
//               {movies.map((movie, index) => (
//                 <Movie key={index} movieObj={movie} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
