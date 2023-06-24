import Footer from '../../components/footer/footer';
import MovieList from '../../components/movie-list/movie-list';
import {SIMILAR_MOVIES_AMOUNT, MovieTabsHashes, AppRoute} from '../../const';
import Header from '../../components/header/header';
import UserBlock from '../../components/user-block/user-block';
import MovieCardPoster from '../../components/movie-card-poster/movie-card-poster';
import MoviePageTabs from '../../components/movie-page-tabs/movie-page-tabs';
import {useLocation} from 'react-router-dom';
import MoviePageTabOverview from '../../components/movie-page-tab-overview/movie-page-tab-overview';
import MoviePageTabDetail from '../../components/movie-page-tab-details/movie-page-tab-details';
import MoviePageTabReviews from '../../components/movie-page-tab-reviews/movie-page-tab-reviews';
import PlayButton from '../../components/play-button/play-button';
import MyListButton from '../../components/my-list-button/my-list-button';
import MovieButtons from '../../components/movie-buttons/movie-buttons';
import AddReviewButton from '../../components/add-review-button/add-review-button';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner';
import Error from '../../components/error/error';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {selectSingleStatus, selectSingleFilm, fetchSingleFilm} from '../../store/slices/single-film-slice/single-film-slice';
import {selectSimilarFilms, fetchSimilarFilms} from '../../store/slices/similar-films-slice/similar-films-slice';
import {fetchComments, selectSortedComments} from '../../store/slices/comments-slice/comments-slice';
import {getIsAuth} from '../../store/slices/user-slice/user-slice';
import {redirectToRoute} from '../../store/action';

const MoviePage = ():JSX.Element => {
  const dispatch = useAppDispatch();
  const movieId = Number(useParams().id);
  const location = useLocation();
  const isAuth = useAppSelector(getIsAuth);

  const status = useAppSelector(selectSingleStatus);
  const movie = useAppSelector(selectSingleFilm);
  const similarMovies = useAppSelector(selectSimilarFilms);


  useEffect(() => {
    dispatch(fetchSingleFilm(movieId));
    dispatch(fetchSimilarFilms(movieId));
    dispatch(fetchComments(movieId));
  }, [movieId, dispatch]);

  useEffect(() => {
    if (!status.isLoading && !movie) {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  });

  const sortedComments = useAppSelector(selectSortedComments);

  if (status.isError) {
    return (
      <Error />
    );
  }

  if (movie === null || status.isLoading) {
    return (
      <Spinner />
    );
  }

  const {name, backgroundImage, genre, released, posterImage, id, backgroundColor} = movie;


  const renderTab = () => {
    switch (location.hash) {
      case MovieTabsHashes.Overview:
        return <MoviePageTabOverview movie={movie} />;

      case MovieTabsHashes.Details:
        return <MoviePageTabDetail movie={movie} /> ;

      case MovieTabsHashes.Reviews:
        return <MoviePageTabReviews reviews={sortedComments} /> ;

      default:
        return '';
    }
  };

  return (
    <>
      <section className="film-card film-card--full" style={{background: backgroundColor}}>
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

              <MovieButtons>
                <PlayButton id={id.toString()} />
                <MyListButton movie={movie} />
                {isAuth && <AddReviewButton id={id} />}
              </MovieButtons>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <MovieCardPoster photoUrl={posterImage} name={name} className="film-card__poster--big" />
            <div className="film-card__desc">
              <MoviePageTabs movie={movie} />
              {renderTab()}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MovieList movies={similarMovies} maxAmountToShow={SIMILAR_MOVIES_AMOUNT} />
        </section>
        <Footer />
      </div>
    </>
  );
};

export default MoviePage;
