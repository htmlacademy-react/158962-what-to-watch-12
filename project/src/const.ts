import {ILoginForm} from './types/login-form';

export const SIMILAR_MOVIES_AMOUNT = 4;
export const HOUR = 60;
export const MAX_STEP = 8;
export const MAX_GENRES_AMOUNT = 9;
export const DEFAULT = 'All genres';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Film = '/films/:id',
  MyList = '/mylist',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  Tabs = '/films/:id/:tabhash',
  NotFound = '/404'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
  Promo = '/promo'
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export enum NameSpace {
  Films = 'FILMS',
  Film = 'FILM',
  User = 'USER',
  Comments = 'COMMENTS',
  SimilarFilms = 'SIMILAR_FILMS',
  Notifications = 'NOTIFICATIONS',
  Favorites = 'FAVORITES',
  Promo = 'PROMO'
}

export const EMAIL_REGEXP = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
export const PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-z]){6,}/g;

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 400;

export const LOGIN_FIELDS:ILoginForm[] = [
  {type: 'email', name: 'user-email', value: 'Email address'},
  {type: 'password', name: 'user-password', value: 'Password'},
];


export const RATING_STARS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

export const MOVIE_TABS = [
  {name: 'Overview', hash: ''},
  {name: 'Details', hash: '#details'},
  {name: 'Review', hash: '#reviews'},
];

export enum MovieTabsHashes {
  Overview = '',
  Details = '#details',
  Reviews = '#reviews'
}

export const RATING = {
  BAD: {max: 2.9, value: 'Bad'},
  NORMAL: {max: 4.9, value: 'Normal'},
  GOOD: {max: 7.9, value: 'Good'},
  VERY_GOOD: {max: 9.9, value: 'Very Good'},
  AWESOME: {min: 10, value: 'Awesome'}
};

export enum PlayerButtons {
  Pause = '#pause',
  Play = '#play-s',
  FullScreen = '#full-screen',
}

export enum TimeInSeconds {
  Hour = 3600,
  Minute = 60
}
