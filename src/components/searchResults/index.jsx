import MovieCard from './movieCard';

export default function SearchResults({ movies }) {
  console.log('movies:', movies);
  if (!movies || !movies.total_results || movies.total_results === 0) {
    return <></>;
  }
  const movieList = movies.results.map((m) => (
    <MovieCard key={m.id} movie={m} />
  ));
  return (
    <div>
      <h2>Movies List</h2>
      <div className='movie-list-wrapper'>{movieList}</div>
    </div>
  );
}
