import Main from '../../pages/main/main';
import {Route, Routes} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {checkAuthAction, selectAuthorizationStatus} from '../../store/slices/user-slice/user-slice';
import {useEffect, Suspense, lazy} from 'react';
import Spinner from '../spinner/spinner';

const AddReview = lazy(() => import('../../pages/add-review/add-review'));
const Login = lazy(() => import('../../pages/login/login'));
const NotFound = lazy(() => import('../../pages/not-found/not-found'));
const Player = lazy(() => import('../../pages/player/player'));
const MoviePage = lazy(() => import('../../pages/movie-page/movie-page'));
const MyList = lazy(() => import('../../pages/my-list/my-list'));

const App = (): JSX.Element => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();
  const isLoading = authorizationStatus === AuthorizationStatus.Unknown;

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path={AppRoute.Root} element={<Main />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Film} element={<MoviePage />} />
        <Route path={AppRoute.Player} element={<Player />} />
        <Route path={AppRoute.MyList} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <MyList />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.AddReview} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <AddReview />
          </PrivateRoute>
        }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>

  );
};

export default App;
