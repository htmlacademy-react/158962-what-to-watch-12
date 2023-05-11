import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsAuth } from '../../store/slices/user-slice/user-slice';
import {useNavigate} from 'react-router-dom';
import { AppRoute } from '../../const';

const MyListButton = ():JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(getIsAuth);

  return (
    <button
      onClick={() => {

        !isAuth && navigate(AppRoute.Login);
      }}
      className="btn btn--list film-card__button"
      type="button">
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">9</span>
    </button>
  )
};


export default MyListButton;
