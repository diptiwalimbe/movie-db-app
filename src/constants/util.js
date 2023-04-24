export const API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;
export const API_TOKEN = import.meta.env.VITE_REACT_APP_TMDB_API_TOKEN;
export const config = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
};
export const BASE_API_URL = 'https://api.themoviedb.org/3';
export const BASE_SEARCH_URL = BASE_API_URL + '/search';
export const SEARCH_PERSON_URL = BASE_SEARCH_URL + '/person';
export const DISCOVER_MOVIE_URL = 'https://api.themoviedb.org/3/discover/movie';

export const BASE_IMAGE_CONFIG_URL = 'https://image.tmdb.org/t/p/';
export const PROFILE_PHOTO_SIZE = 'w185';
export const POSTER_PHOTO_SIZE = 'w185';

export const SORT_FIELD_VOTE_AVERAGE = 'vote_average';
export const SORT_FIELD_RELEASE_DATE = 'release_date';
export const SORT_ASCENDING = 'asc';
export const SORT_DESCENDING = 'desc';
