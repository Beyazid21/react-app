import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "../contexts/ThemeContext";

export default function SearchForm({}) {
  const { theme } = useContext(ThemeContext);
  const [serachQuery, setSearchQuery] = useState("");
  const navigete = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();

    // axtarış düyməsinə basıldığında yapılacak işlemler

    const qyuery = serachQuery.trim();
    if (qyuery.length > 3) {
      // Məsələn, axtarış nəticələri səhifəsinə yönləndirmək

      navigete(`/search?query=${encodeURIComponent(qyuery)}`);
    }

    setSearchQuery("");
  }
  return (
    <form
      action=""
      className="d-flex mb-2 mb-lg-0 ms-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        className="form-control me-1"
        placeholder="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={serachQuery}
      />
      <button className={`btn btn-${theme}`} type="submit">
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
}
