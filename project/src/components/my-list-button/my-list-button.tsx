import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsAuth } from '../../store/slices/user-slice/user-slice';
import {useNavigate} from 'react-router-dom';
import { AppRoute } from '../../const';
import {addFavoriteOffer, selectFavoriteOffers} from '../../store/slices/favorites-slice/favorites-slice';
import {IMovie} from '../../types/movie';

interface MyListButtonProps {
  movie: IMovie;
}

const MyListButton = ({movie}: MyListButtonProps):JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(getIsAuth);
  const favoriteOffers = useAppSelector(selectFavoriteOffers);
  const favoriteOffersAmount = favoriteOffers.length;
  const svgHash = movie.isFavorite ? '#in-list' : '#add';

  const handleButtonClick = () => {
    dispatch(addFavoriteOffer(movie));
  };

  return (
    <button
      onClick={() => {
        !isAuth && navigate(AppRoute.Login);
        handleButtonClick();
      }}
      className="btn btn--list film-card__button"
      type="button"
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={svgHash}></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favoriteOffersAmount}</span>
    </button>
  );
};


export default MyListButton;
