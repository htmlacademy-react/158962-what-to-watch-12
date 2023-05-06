import { IMovie } from '../../types/Movie';
import { generatePath, Link } from 'react-router-dom';
import {AppRoute} from '../../const';

interface MovieCardProps {
  movie: IMovie;
  onActiveCardId?: (id: number | null) => void;
}

const MovieCard = ({movie, onActiveCardId}: MovieCardProps):JSX.Element => {
  const { name, previewImage, id } = movie;
  return (
    <article className="small-film-card catalog__films-card">
      <Link to={generatePath(AppRoute.Film, { id: `${id}`})}
        className="small-film-card__link"
        onMouseOver={() => onActiveCardId?.(id)}
        onMouseLeave={() => onActiveCardId?.(null)}
      >
        <div className="small-film-card__image">
          <img src={previewImage}
            alt={name}
            width="280"
            height="175"
          />
        </div>
      </Link>
      <h3 className="small-film-card__title">
        <Link to={generatePath(AppRoute.Film, { id: `${id}`})} className="small-film-card__link">{name}</Link>
      </h3>
    </article>
  );
};

export default MovieCard;
