import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import FilmsSlice from './slices/films-slice/films-slice';
import PromoFilmSlice from './slices/promo-film-slice/promo-film-slice';
import SingleFilmSlice from './slices/single-film-slice/single-film-slice';
import SimilarFilmsSlice from './slices/similar-films-slice/similar-films-slice';
import CommentsSlice from './slices/comments-slice/comments-slice';
import UserSlice from './slices/user-slice/user-slice';
import FavoritesSlice from './slices/favorites-slice/favorites-slice';
import NotificationsSlice from './slices/notification-slice/notification-slice';

export const rootReducer = combineReducers({
  [NameSpace.Films]: FilmsSlice,
  [NameSpace.Promo]: PromoFilmSlice,
  [NameSpace.Film]: SingleFilmSlice,
  [NameSpace.SimilarFilms]: SimilarFilmsSlice,
  [NameSpace.Comments]: CommentsSlice,
  [NameSpace.User]: UserSlice,
  [NameSpace.Favorites]: FavoritesSlice,
  [NameSpace.Notifications]: NotificationsSlice,
});
