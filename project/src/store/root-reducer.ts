import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import FilmsSlice from './slices/films-slice/films-slice';
import PromoFilmSlice from './slices/promo-film-slice/promo-film-slice';
import SingleFilmSlice from './slices/single-film-slice/single-film-slice';
import SimilarFilmsSlice from './slices/similar-films-slice/similar-films-slice';
import CommentsSlice from './slices/comments-slice/comments-slice';
/*
import AppSlice from './slices/app-slice/app-slice';
import OfferSlice from './slices/offer-slice/offer-slice';
import UserSlice from './slices/user-slice/user-slice';
import SingleOffer from './slices/single-offer-slice/single-offer-slice';
import NearbyOffers from './slices/nearby-offers-slice/nearby-offers-slice';

import NotificationsSlice from './slices/notification-slice/notification-slice';
import FavoritesSlice from './slices/favorites-slice/favorites-slice';*/

export const rootReducer = combineReducers({
  [NameSpace.Films]: FilmsSlice,
  [NameSpace.Promo]: PromoFilmSlice,
  [NameSpace.Film]: SingleFilmSlice,
  [NameSpace.SimilarFilms]: SimilarFilmsSlice,
  [NameSpace.Comments]: CommentsSlice,
  /*
  [NameSpace.User]: UserSlice,
  [NameSpace.NearbyOffers]: NearbyOffers,

  [NameSpace.Notifications]: NotificationsSlice,
  [NameSpace.Favorites]: FavoritesSlice,*/
});
