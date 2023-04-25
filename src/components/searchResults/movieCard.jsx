import { BASE_IMAGE_CONFIG_URL, POSTER_PHOTO_SIZE } from '../../constants/util';

export default function MovieCard({ movie }) {
  return (
    <div className='movie-card'>
      <div>
        <img
          className='movie-poster'
          src={`${BASE_IMAGE_CONFIG_URL}${POSTER_PHOTO_SIZE}/${movie.poster_path}`}
          alt='movie poster'
        ></img>
      </div>
      <div>
        <h4>{movie.title}</h4>
        <button className='more-options-button'>&#x22EE;</button>
        <span>{movie.release_date.split('-')[0]}</span>
        <br />
        <span>Rating: {movie.vote_average}</span>
      </div>
    </div>
  );
}
