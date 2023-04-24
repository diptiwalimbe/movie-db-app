import { useContext } from 'react';
import MovieCard from './movieCard';
import { DuoSearchPageContext } from '../../contexts/DuoSearchPageContext';
import {
  TbSortAscendingNumbers,
  TbSortDescendingNumbers,
} from 'react-icons/tb';
import { getMoviesForDuo } from '../../logic/searchMovies';
import {
  SORT_FIELD_VOTE_AVERAGE,
  SORT_FIELD_RELEASE_DATE,
  SORT_ASCENDING,
  SORT_DESCENDING,
} from '../../constants/util';

export default function SearchResults() {
  const { moviesList, setMoviesList, actor1, actor2 } =
    useContext(DuoSearchPageContext);

  async function changeSorting(sortField, sortDirection) {
    const sortedList = await getMoviesForDuo(
      actor1,
      actor2,
      sortField,
      sortDirection
    );
    setMoviesList(sortedList);
  }
  if (!moviesList || moviesList.total_results === undefined) {
    return <></>;
  }
  if (moviesList.total_results === 0) {
    return <h2>Sorry the search returned no results</h2>;
  }
  const movieList = moviesList.results.map((m) => (
    <MovieCard key={m.id} movie={m} />
  ));
  return (
    <section>
      <div className='results-header'>
        <span>Sort by: </span>
        <button
          className='sort-button'
          id='btn_rating_desc'
          onClick={(e) =>
            changeSorting(SORT_FIELD_VOTE_AVERAGE, SORT_DESCENDING)
          }
        >
          <span>Rating</span>
          <TbSortDescendingNumbers size={20} />
        </button>
        <button
          className='sort-button'
          id='btn_rating_asc'
          onClick={(e) =>
            changeSorting(SORT_FIELD_VOTE_AVERAGE, SORT_ASCENDING)
          }
        >
          <span>Rating</span>
          <TbSortAscendingNumbers size={20} />
        </button>

        <button
          className='sort-button'
          id='btn_release_desc'
          onClick={(e) =>
            changeSorting(SORT_FIELD_RELEASE_DATE, SORT_DESCENDING)
          }
        >
          <span>Release year</span>
          <TbSortDescendingNumbers size={20} />
        </button>
        <button
          className='sort-button'
          id='btn_release_asc'
          onClick={(e) =>
            changeSorting(SORT_FIELD_RELEASE_DATE, SORT_ASCENDING)
          }
        >
          <span>Release year</span>
          <TbSortAscendingNumbers size={20} />
        </button>
      </div>
      <div className='movie-list-wrapper'>{movieList}</div>
    </section>
  );
}
