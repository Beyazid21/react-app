import { useEffect, useState } from "react";
import Header from "./components/Header";
import Logo from "./components/Logo";
import SearchForm from "./components/SearchForm";
import WatchListButton from "./components/WatchListButton";
import WatchList from "./components/WatchList";
import MovieDetails from "./components/MovieDetails";
import MovieList from "./components/MovieList";
import ErrorMessage from "./components/ErrorMessage";
import Main from "./components/main";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const api_key = "89aa20fbb4f80528bc1de3764da78721";
const page = 2;

const language = "en-US";
const query = "batman";

export default function App2() {
  const [movie_list, setMovies] = useState([]);
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [isWatchListOpen, setWatchListOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [serachQuery, setSearchQuery] = useState(query);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${serachQuery}&language=${language}&page=${page}`
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

    if (serachQuery.trim().length < 4) {
      setMovies([]);
      setError("");
      return;
    }

    getMovies();
  }, [serachQuery]);

  // useEffect(() => {
  //   fetch(
  //     `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&query=${query}&language=${language}&page=${page}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMovies(data.results);
  //     });
  // }, []); //Hər hansı state dəyişəni dəyişəndə App komponeneti yenidən render olunur amma useEffect içində boş array verildiyi üçün yalnız ilk renderdə işləyəcək yəni useEffectin içindəkilər göz ardı ediləcək ikinci parametr isə dependency array adlanır nə iş gördüyü isə içindəki state dəyişənləri izləyir və onlar dəyişəndə useEffect yenidən işə düşür

  //Mounting =>ilk render zamanı
  //rerender =>hər state dəyişəndə yenidən render olunma
  //Unmounting =>Domdan komponentin silinməsi zamanı

  function handleAddToWatchList(movie) {
    const isAddedToList = watchListMovies.map((x) => x.id).includes(movie.id);
    if (!isAddedToList) {
      setWatchListMovies((movies) => [...movies, movie]);
    }
  }

  function handleSelectedMovie(movie) {
    setSelectedMovie(movie);
    window.scrollTo(0, 0);
  }

  function handleRemoveFromWatchList(movie) {
    const updatedWatchList = watchListMovies.filter((m) => m.id !== movie.id);
    setWatchListMovies(updatedWatchList);
  }
  return (
    <>
      <Header>
        <Logo />
        <SearchForm serachQuery={serachQuery} setSearchQuery={setSearchQuery} />
        <WatchListButton
          watchListMovies={watchListMovies}
          onSetWatchListOpen={setWatchListOpen}
        />
      </Header>
      <Main>
        {selectedMovie && (
          <MovieDetails
            movieObj={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
        <WatchList
          onHandleRemoveFromWatchList={handleRemoveFromWatchList}
          watchListMovies={watchListMovies}
          isWatchListOpen={isWatchListOpen}
        />

        {loading && <Loading />}
        {!loading && !error && (
          <MovieList
            movies={movie_list}
            onAddToList={handleAddToWatchList}
            onSelectedMovie={handleSelectedMovie}
          />
        )}

        {error && <ErrorMessage message={error} />}
      </Main>
      <Footer />
    </>
  );
}
