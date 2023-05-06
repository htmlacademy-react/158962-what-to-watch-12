import {IMovie} from '../../types/Movie';
import {getRatingDescription} from '../../utils/utils';

interface MoviePageTabOverviewProps {
  movie: IMovie;
}

const MoviePageTabOverview = ({movie}: MoviePageTabOverviewProps):JSX.Element => {
  const { rating, scoresCount, description, director, starring } = movie;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingDescription(rating)}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        {description}

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring">
          <strong>Starring: {starring.join(', ')} and other</strong>
        </p>
      </div>
    </>
  );
};

export default MoviePageTabOverview;
