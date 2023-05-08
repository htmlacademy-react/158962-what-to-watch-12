import {selectFilms, showMoreFilms} from '../../store/slices/films-slice/films-slice';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {IMovie} from '../../types/movie';


const ShowMoreButton = ():JSX.Element => {
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    dispatch(showMoreFilms())
  }

  return (
    <div className="catalog__more">
      <button className="catalog__button"
              onClick={handleButtonClick}
              type="button">Show more</button>
    </div>
  )
};

export default ShowMoreButton;
