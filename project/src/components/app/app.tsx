import Main from '../../pages/main/main';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import Login from '../../pages/login/login';
import MyList from '../../pages/my-list/my-list';
import AddReview from '../../pages/add-review/add-review';
import MoviePage from '../../pages/movie-page/movie-page';
import Player from '../../pages/player/player';
import { IReview } from '../../types/Review';
import { IMovie } from '../../types/Movie';

interface AppProps {
  comments: IReview[];
  movies: IMovie[];
  promoMovie: IMovie;
}

const App = ({movies, comments, promoMovie}: AppProps): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Root} element={<Main promoMovie={promoMovie} movies={movies} />} />
      <Route path={AppRoute.Login} element={<Login />} />
      <Route path={AppRoute.Film} element={<MoviePage movie={movies[1]} reviews={comments} />} />
      <Route path={AppRoute.Player} element={<Player />} />
      <Route path={AppRoute.MyList} element={
        <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
          <MyList movies={movies} />
        </PrivateRoute>
      }
      />

      <Route path={AppRoute.AddReview} element={
        <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
          <AddReview movie={movies[1]} />
        </PrivateRoute>
      }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
