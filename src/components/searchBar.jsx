import { useState, useEffect } from 'react';
import { getMoviesForDuo } from '../logic/searchMovies';
import { getPersonSuggestions } from '../logic/searchPersons';
import SearchResults from './searchResults';

export default function SearchBar() {
  const [person1, setPerson1] = useState('');
  const [person2, setPerson2] = useState('');
  const [p1Suggestions, setP1Suggestions] = useState([]);
  const [p2Suggestions, setP2Suggestions] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (person1.length > 2) {
      getPersonSuggestions(person1).then((data) => {
        setP1Suggestions(data);
      });
    }
  }, [person1]);

  useEffect(() => {
    if (person2.length > 2) {
      getPersonSuggestions(person2).then((data) => {
        setP2Suggestions(data);
      });
    }
  }, [person2]);

  async function handleClick() {
    console.log(person1);
    console.log(person2);
    const movieList = await getMoviesForDuo(person1, person2);
    setMovies(movieList);
  }

  return (
    <>
      <div className='search-bar'>
        <h2>Search for your favourite duo</h2>
        <input
          className='search-input'
          type='text'
          id='person-1'
          name='person-1'
          value={person1}
          list='person1-suggestions'
          onChange={(e) => setPerson1(e.target.value)}
        />
        <datalist id='person1-suggestions'>
          {p1Suggestions.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
        <input
          className='search-input'
          type='text'
          id='person-2'
          value={person2}
          list='person2-suggestions'
          onChange={(e) => setPerson2(e.target.value)}
        />
        <datalist id='person2-suggestions'>
          {p2Suggestions.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
        <br />
        <button
          disabled={person1 === '' || person2 === ''}
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
