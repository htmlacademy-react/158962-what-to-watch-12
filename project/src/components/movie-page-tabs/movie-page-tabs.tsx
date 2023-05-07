import {MOVIE_TABS, AppRoute} from '../../const';
import { Link, generatePath, useLocation } from 'react-router-dom';
import { IMovie } from '../../types/movie';
import cn from 'classnames';

interface MoviePageTabs {
  movie: IMovie;
}

const MoviePageTabs = ({movie}: MoviePageTabs): JSX.Element => {
  const { id } = movie;
  const location = useLocation();

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {
          MOVIE_TABS.map(({name, hash}) => (
            <li key={name}
              className={cn('film-nav__item', {'film-nav__item--active': location.hash === hash})}
            >
              <Link to={generatePath(AppRoute.Tabs, {id: id.toString(), tabhash: hash})} className="film-nav__link">{name}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

export default MoviePageTabs;
