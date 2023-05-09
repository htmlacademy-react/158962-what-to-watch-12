import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import HistoryRouter from '../src/components/history-route/history-route';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import browserHistory from './browser-history';
import { movies } from './mocks/movies';
import {fetchFilms} from './store/slices/films-slice/films-slice';
import {fetchPromoFilm} from './store/slices/promo-film-slice/promo-film-slice';

store.dispatch(fetchFilms());
store.dispatch(fetchPromoFilm());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        {/*<Notification />*/}
        <App movies={movies} />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
