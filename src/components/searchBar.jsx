import { useState } from "react";
import { getMoviesForDuo } from "../logic/searchMovies";
import SearchResults from "./searchResults";

export default function SearchBar() {
  const [person1, setPerson1] = useState("");
  const [person2, setPerson2] = useState("");
  const [movies, setMovies] = useState([]);

  async function handleClick() {
    console.log(person1);
    console.log(person2);
    const movieList = await getMoviesForDuo(person1, person2);
    setMovies(movieList);
  }

  return (
    <>
      <div className="search-bar">
        <h2>Search for your favourite duo</h2>
        <input
          className="search-input"
          type="text"
          id="person-1"
          name="person-1"
          value={person1}
          onChange={(e) => setPerson1(e.target.value)}
          autoComplete="person-1"
        />
        <input
          className="search-input"
          type="text"
          id="person-2"
          value={person2}
          onChange={(e) => setPerson2(e.target.value)}
        />
        <br />
        <button
          disabled={person1 === "" || person2 === ""}
          onClick={() => handleClick()}
        >
          Go for it!
        </button>
      </div>
      <div>
        <SearchResults movies={movies} />
      </div>
    </>
  );
}
