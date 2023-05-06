import MovieCard from '../movie-card/movie-card';
import {IMovie} from '../../types/Movie';

interface FilmsListProps {
  filmsAmount: number;
  movies: IMovie[];
}

const MovieList = ({filmsAmount, movies}: FilmsListProps):JSX.Element => (
  <div className="catalog__films-list">
    {
      movies.slice(0, filmsAmount).map((movie) => <MovieCard key={movie.id} movie={movie} />)
    }
  </div>
);

export default MovieList;
