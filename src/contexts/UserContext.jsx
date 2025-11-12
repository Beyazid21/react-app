import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const storedState = localStorage.getItem("watchList");
  const initialState = storedState ? JSON.parse(storedState) : [];
  const [watchList, setWatchList] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);
  function addToWatchList(movie) {
    const isAddedToList = watchList.map((x) => x.id).includes(movie.id);
    if (!isAddedToList) {
      setWatchList((movies) => [...movies, movie]);
    }
  }
  function removeFromWatchList(movie) {
    const updatedWatchList = watchList.filter((m) => m.id !== movie.id);
    setWatchList(updatedWatchList);
  }
  return (
    <UserContext.Provider
      value={{ watchList, addToWatchList, removeFromWatchList }}
    >
      {children}
    </UserContext.Provider>
  );
}
