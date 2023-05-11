import {useAppDispatch} from '../../hooks';
import { showMoreFilms} from '../../store/slices/films-slice/films-slice';

const ShowMoreButton = ():JSX.Element => {
  const dispatch = useAppDispatch();

  const handleShowMoreButtonClick = () => dispatch(showMoreFilms());

  return (
    <div className="catalog__more">
      <button className="catalog__button"
              onClick={handleShowMoreButtonClick}
              type="button"
      >Show more
      </button>
    </div>
  )
};

export default ShowMoreButton;
