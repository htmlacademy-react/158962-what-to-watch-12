import {useAppDispatch} from '../../hooks';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import {changeGenre, resetFilmsCount} from '../../store/slices/films-slice/films-slice';
import {DEFAULT, MAX_GENRES_AMOUNT} from '../../const';

interface GenresListProps {
  currentGenre: string;
  genresList: string[];
}

const GenresList = ({currentGenre, genresList}: GenresListProps):JSX.Element => {
  const dispatch = useAppDispatch();

  const handleGenreLinkClick = (link: string, currentGenre: string): boolean | void => {
    if ( link === currentGenre) {
      return false;
    }
    dispatch(changeGenre(link));
    dispatch(resetFilmsCount());
  };

  return (
    <ul className="catalog__genres-list">
      {[DEFAULT, ...genresList].slice(0, MAX_GENRES_AMOUNT).map((name) => {

        return (
          <li key={name} className={cn('catalog__genres-item', currentGenre === name && 'catalog__genres-item--active')}>
            <Link to="/#"
                  onClick={(evt) => {
                    evt.preventDefault();
                    handleGenreLinkClick(name, currentGenre);
                    }
                  }
                  className="catalog__genres-link"
            >{name}
            </Link>
          </li>
        )
      })}
    </ul>
  );
};

export default GenresList;
