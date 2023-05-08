import Main from '../../pages/main/main';
import {Route, Routes} from 'react-router-dom';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import Login from '../../pages/login/login';
import MyList from '../../pages/my-list/my-list';
import AddReview from '../../pages/add-review/add-review';
import MoviePage from '../../pages/movie-page/movie-page';
import Player from '../../pages/player/player';
import { IMovie } from '../../types/movie';

interface AppProps {
  movies: IMovie[];
}

const App = ({movies}: AppProps): JSX.Element => (

  <Routes>
    <Route path={AppRoute.Root} element={<Main />} />
    <Route path={AppRoute.Login} element={<Login />} />
    <Route path={AppRoute.Film} element={<MoviePage />} />
    <Route path={AppRoute.Player} element={<Player />} />
    <Route path={AppRoute.MyList} element={
      <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
        <MyList movies={movies} />
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

);

export default App;
