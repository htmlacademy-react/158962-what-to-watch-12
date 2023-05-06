import Footer from '../../components/footer/footer';
import MovieList from '../../components/movie-list/movie-list';
import {AppRoute, filmsAmountMoviePage, MovieTabsHashes} from '../../const';
import Header from '../../components/header/header';
import UserBlock from '../../components/user-block/user-block';
import {movies} from '../../mocks/movies';
import {IMovie} from '../../types/Movie';
import MovieCardPoster from '../../components/movie-card-poster/movie-card-poster';
import MoviePageTabs from '../../components/movie-page-tabs/movie-page-tabs';
import {generatePath, Link, useLocation} from 'react-router-dom';
import MoviePageTabOverview from '../../components/movie-page-tab-overview/movie-page-tab-overview';
import MoviePageTabDetail from '../../components/movie-page-tab-details/movie-page-tab-details';
import MoviePageTabReviews from '../../components/movie-page-tab-reviews/movie-page-tab-reviews';
import {IReview} from '../../types/Review';

interface MoviePageProps {
  movie: IMovie;
  reviews: IReview[];
}

const MoviePage = ({movie, reviews}: MoviePageProps):JSX.Element => {
  const {name, backgroundImage, genre, released, posterImage, id} = movie;
  const location = useLocation();

  const renderTab = () => {
    switch (location.hash) {
      case MovieTabsHashes.Overview:
        return <MoviePageTabOverview movie={movie} />;

      case MovieTabsHashes.Details:
        return <MoviePageTabDetail movie={movie} /> ;

      case MovieTabsHashes.Reviews:
        return <MoviePageTabReviews reviews={reviews} /> ;

      default:
        return '';
    }
  };

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header className="film-card__head">
            <UserBlock />
          </Header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <Link to={AppRoute.MyList} className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </Link>
                <Link to={generatePath(AppRoute.AddReview, { id: `${id}`})} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">

            <MovieCardPoster photoUrl={posterImage} name={name} className="film-card__poster--big" />

            <div className="film-card__desc">

              <MoviePageTabs movie={movie} />

              {
                renderTab()
              }

            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MovieList movies={movies} filmsAmount={filmsAmountMoviePage} />
        </section>
        <Footer />
      </div>
    </>
  );
};

export default MoviePage;
