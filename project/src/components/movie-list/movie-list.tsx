import MovieCard from '../movie-card/movie-card';
import {IMovie} from '../../types/Movie';
import {useState} from 'react';

interface FilmsListProps {
  filmsAmount: number;
  movies: IMovie[];
}

const MovieList = ({filmsAmount, movies}: FilmsListProps):JSX.Element => {
  const [, setActiveCardId] = useState<number | null>(null);

  return (
    <div className="catalog__films-list">
      {
        movies.slice(0, filmsAmount).map((movie) => <MovieCard key={movie.id} movie={movie} onActiveCardId={setActiveCardId} />)
      }
    </div>
  )
};

export default MovieList;
