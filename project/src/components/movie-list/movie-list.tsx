import MovieCard from '../movie-card/movie-card';
import {IMovie} from '../../types/movie';
import {useState} from 'react';

interface FilmsListProps {
  movies: IMovie[];
  maxAmountToShow?: number;
}

const MovieList = ({ movies, maxAmountToShow}: FilmsListProps):JSX.Element => {
  const [, setActiveCardId] = useState<number | null>(null);

  return (
    <div className="catalog__films-list">
      {movies
        .slice(0, maxAmountToShow)
        .map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onActiveCardId={setActiveCardId}
          />))}
    </div>
  );
};

export default MovieList;
