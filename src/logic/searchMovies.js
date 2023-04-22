import axios from 'axios';
import {
  API_KEY,
  BASE_API_URL,
  BASE_SEARCH_URL,
  SEARCH_PERSON_URL,
  DISCOVER_MOVIE_URL,
  config,
} from '../constants/util';
import { getPerson } from './searchPersons';

export async function getMoviesForPerson(personId) {
  const url = `${BASE_API_URL}/person/${personId}/movie_credits`;
  const resp = await axios.get(url, config);
  console.log('resp:', resp);
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

      console.log('movies:', resp.data);
      moviesList = resp.data;
    } catch (e) {
      console.log(e);
    }
  }
  return moviesList;
}
