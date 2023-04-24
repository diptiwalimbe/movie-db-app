import { useState, useEffect, useContext } from 'react';
import { getMoviesForDuo } from '../logic/searchMovies';
import { getPersonSuggestions } from '../logic/searchPersons';
import { DuoSearchPageContext } from '../contexts/DuoSearchPageContext';

export default function SearchBar() {
  const { setMoviesList, clearMoviesList, setActor1, setActor2 } =
    useContext(DuoSearchPageContext);
  const [person1, setPerson1] = useState('');
  const [person2, setPerson2] = useState('');
  const [p1Suggestions, setP1Suggestions] = useState([]);
  const [p2Suggestions, setP2Suggestions] = useState([]);

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
    setActor1(person1);
    setActor2(person2);
    const movieList = await getMoviesForDuo(person1, person2);
    setMoviesList(movieList);
  }

  function handleTextChange(value, id) {
    if (id === 'person-1') {
      setPerson1(value);
      setActor1(value);
    } else {
      setPerson2(value);
      setActor2(value);
    }
    if (value.length < 3) {
      clearMoviesList();
    }
  }

  return (
    <>
      <div className='search-wrapper'>
        <div className='side-info'>
          <p className='side-info-text'>
            Please use the text boxes to enter the names of the actors and click
            the button to get the movies starring the duo.
          </p>
        </div>
        <div className='search-bar'>
          <h2>Search for your favourite duo</h2>
          <input
            className='search-input'
            type='text'
            id='person-1'
            name='person-1'
            value={person1}
            list='person1-suggestions'
            onChange={(e) => handleTextChange(e.target.value, 'person-1')}
            autoComplete='off'
            role='combobox'
          />
          <datalist id='person1-suggestions' role='listbox'>
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
            onChange={(e) => handleTextChange(e.target.value, 'person-2')}
            autoComplete='off'
          />
          <datalist id='person2-suggestions'>
            {p2Suggestions.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
          <button
            disabled={person1 === '' || person2 === ''}
            onClick={() => handleClick()}
          >
            Go for it!
          </button>
        </div>
      </div>
    </>
  );
}
