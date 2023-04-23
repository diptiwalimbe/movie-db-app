import axios from 'axios';
import { BASE_API_URL, DISCOVER_MOVIE_URL, config } from '../constants/util';
import { getPerson } from './searchPersons';

export async function getMoviesForPerson(personId) {
  const url = `${BASE_API_URL}/person/${personId}/movie_credits`;
  const resp = await axios.get(url, config);
}

export async function getMoviesForDuo(person1, person2) {
  const person1Result = await getPerson(person1);
  const person2Result = await getPerson(person2);
  let moviesList;

  if (person1Result && person2Result) {
    try {
      const url = `${DISCOVER_MOVIE_URL}?with_cast=${person1Result.get(
        'id'
      )},${person2Result.get('id')}&sort_by=vote_average.desc`;
      const resp = await axios.get(url, config);
      moviesList = resp.data;
    } catch (e) {
      console.log(e);
    }
  }
  return moviesList;
}
