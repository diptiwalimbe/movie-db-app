import axios from 'axios';
import { SEARCH_PERSON_URL, config } from '../constants/util';

/**
 *
 * @param {string} personName
 * @returns the person object if it exists
 */
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

/**
 * Sets the person details object in local storage
 * @param {object} personDetails
 */
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

/**
 *
 * @param {string} person
 * @returns object containing details of the actor
 */
export async function getPerson(person) {
  let personResult = getPersonFromLocalStorage(person);

  if (
    personResult &&
    personResult[0]?.name?.toLowerCase() === person.toLowerCase()
  ) {
    personResult = personResult[0];
    personResult = new Map(Object.entries(personResult));
  } else {
    personResult = undefined;
    const url = `${SEARCH_PERSON_URL}?query=${encodeURI(person)}`;
    try {
      const resp = await axios.get(url, config);

      if (resp && resp.data.total_results > 0) {
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

  return personResult;
}

/**
 *
 * @param {string} personInput
 * @returns an array of strings - suggestions for actor names
 */
export async function getPersonSuggestions(personInput) {
  const suggestions = new Set();
  //currently the API cannot filter by known for department
  const url = `${SEARCH_PERSON_URL}?query=${encodeURI(
    personInput
  )}&sort_by=name.desc`;
  try {
    const resp = await axios.get(url, config);
    //need to filter results by department acting to get just the actor suggestions
    if (resp && resp.data.total_results > 0) {
      resp.data.results.forEach((p) => {
        if (p.known_for_department === 'Acting') {
          suggestions.add(p.name);
        }
      });
    }
    //return array and not set
    return [...suggestions];
  } catch (e) {
    console.log(e);
  }
}
