import { IMovie } from '../../types/movie';
import { generatePath, Link } from 'react-router-dom';
import {AppRoute} from '../../const';
import VideoPreload from '../video-preload/video-preload';

interface MovieCardProps {
  movie: IMovie;
  onActiveCardId?: (id: number | null) => void;
}

const MovieCard = ({movie, onActiveCardId}: MovieCardProps):JSX.Element => {
  const { name, previewImage, id, previewVideoLink } = movie;

  return (
    <article className="small-film-card catalog__films-card">
      <Link to={generatePath(AppRoute.Film, { id: `${id}`})}
        className="small-film-card__link"
        onMouseOver={() => onActiveCardId?.(id)}
        onMouseLeave={() => onActiveCardId?.(null)}
      >
        <VideoPreload previewImage={previewImage} previewVideoLink={previewVideoLink} />
      </Link>
      <h3 className="small-film-card__title">
        <Link to={generatePath(AppRoute.Film, { id: `${id}`})} className="small-film-card__link">{name}</Link>
      </h3>
    </article>
  );
};

export default MovieCard;
