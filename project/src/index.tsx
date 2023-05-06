import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { movies } from './mocks/movies';
import { comments } from './mocks/comments';
import { promoMovie } from './mocks/promo-movie';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App promoMovie={promoMovie} movies={movies} comments={comments} />
  </React.StrictMode>,
);
