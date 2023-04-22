import axios from 'axios';
import {
  API_KEY,
  BASE_API_URL,
  BASE_SEARCH_URL,
  SEARCH_PERSON_URL,
  DISCOVER_MOVIE_URL,
  config,
} from '../constants/util';

export function getPersonFromLocalStorage(personName) {
  const storedPersons = localStorage.getItem('storedPersons');
  let person;
  if (storedPersons) {
    const personsList = JSON.parse(storedPersons);
    person = personsList.filter(
      (p) => p.name.toLowerCase() === personName.toLowerCase()
    );
  }

  return person;
}

export function setPersonInLocalStorage(personDetails) {
  const storedPersons = localStorage.getItem('storedPersons');

  let storePersonsList;
  if (storedPersons) {
    const personsList = JSON.parse(storedPersons);
    storePersonsList = [...personsList, Object.fromEntries(personDetails)];

    localStorage.setItem('storedPersons', JSON.stringify(storePersonsList));
  } else {
    storePersonsList = [new Map([...personDetails])];

    localStorage.setItem(
      'storedPersons',
      JSON.stringify(storePersonsList.map((elem) => Object.fromEntries(elem)))
    );
  }
}

export async function getPerson(person) {
  let personResult = getPersonFromLocalStorage(person);

  if (
    personResult &&
    personResult[0]?.name?.toLowerCase() === person.toLowerCase()
  ) {
    console.log('1');
    personResult = personResult[0];
    personResult = new Map(Object.entries(personResult));
  } else {
    console.log('2');
    personResult = undefined;
    const url = `${SEARCH_PERSON_URL}?query=${encodeURI(person)}`;
    try {
      const resp = await axios.get(url, config);
      console.log('person:', resp);
      if (resp && resp.data.total_results > 0) {
        console.log('3');
        personResult = new Map();
        personResult.set('id', resp.data.results[0].id);
        personResult.set('name', resp.data.results[0].name);
        personResult.set('profile_path', resp.data.results[0].profile_path);
        setPersonInLocalStorage(personResult);
      }
    } catch (e) {
      console.log(e);
    }
  }
  console.log('fnal:', personResult);
  return personResult;
}
