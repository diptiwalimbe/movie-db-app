import axios from 'axios';
import {
  DISCOVER_MOVIE_URL,
  config,
  SORT_FIELD_VOTE_AVERAGE,
  SORT_DESCENDING,
} from '../constants/util';
import { getPerson } from './searchPersons';

/**
 *
 * @param {string} person1
 * @param {string} person2
 * @param {string} sortField
 * @param {string} sortDirection
 * @param {int} pageNumber
 * @returns an object with list of movies, total_results and number of pages
 */
export async function getMoviesForDuo(
  person1,
  person2,
  sortField = SORT_FIELD_VOTE_AVERAGE,
  sortDirection = SORT_DESCENDING,
  pageNumber = 1
) {
  const person1Result = await getPerson(person1);
  const person2Result = await getPerson(person2);
  let moviesList;

  if (person1Result && person2Result) {
    try {
      const url = `${DISCOVER_MOVIE_URL}?with_cast=${person1Result.get(
        'id'
      )},${person2Result.get(
        'id'
      )}&sort_by=${sortField}.${sortDirection}&page=${pageNumber}`;
      const resp = await axios.get(url, config);
      moviesList = resp.data;
    } catch (e) {
      console.log(e);
    }
  }

  return moviesList;
}
