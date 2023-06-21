import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {
  logoutAction,
  selectAvatar,
  getIsAuth} from '../../store/slices/user-slice/user-slice';
import {useAppDispatch, useAppSelector} from '../../hooks';

const UserBlock = ():JSX.Element => {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(selectAvatar);
  const isAuth = useAppSelector(getIsAuth);

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          {isAuth &&
            <Link to={AppRoute.MyList}>
              <img src={avatar} alt="User avatar" width="63" height="63" />
            </Link>}
        </div>
      </li>
      <li className="user-block__item">
        {isAuth ?
          <Link
            className="user-block__link"
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
            to={AppRoute.Root}
          >
            Sign out
          </Link> :
          <Link
            className="user-block__link"
            to={AppRoute.Login}
          >
            Sign in
          </Link>}
      </li>
    </ul>
  );
};

export default UserBlock;
