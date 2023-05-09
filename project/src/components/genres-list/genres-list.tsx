import {useAppDispatch} from '../../hooks';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import {changeGenre} from '../../store/slices/films-slice/films-slice';
import {DEFAULT, MAX_GENRES_AMOUNT} from '../../const';

interface GenresListProps {
  currentGenre: string;
  genresList: string[];
}

const GenresList = ({currentGenre, genresList}: GenresListProps):JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <ul className="catalog__genres-list">
      {[DEFAULT, ...genresList].slice(0, MAX_GENRES_AMOUNT).map((name) => (
        <li key={name} className={cn('catalog__genres-item', currentGenre === name && 'catalog__genres-item--active')}>
          <Link to="/#"
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(changeGenre(name));}}
            className="catalog__genres-link"
          >{name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GenresList;
