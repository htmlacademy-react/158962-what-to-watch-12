import Footer from '../../components/footer/footer';
import MovieList from '../../components/movie-list/movie-list';
import {filmsAmountMoviePage, MovieTabsHashes} from '../../const';
import Header from '../../components/header/header';
import UserBlock from '../../components/user-block/user-block';
import {movies} from '../../mocks/movies';
import {IMovie} from '../../types/Movie';
import MovieCardPoster from '../../components/movie-card-poster/movie-card-poster';
import MoviePageTabs from '../../components/movie-page-tabs/movie-page-tabs';
import {useLocation} from 'react-router-dom';
import MoviePageTabOverview from '../../components/movie-page-tab-overview/movie-page-tab-overview';
import MoviePageTabDetail from '../../components/movie-page-tab-details/movie-page-tab-details';
import MoviePageTabReviews from '../../components/movie-page-tab-reviews/movie-page-tab-reviews';
import {IReview} from '../../types/Review';
import PlayButton from '../../components/play-button/play-button';
import MyListButton from '../../components/my-list-button/my-list-button';
import MovieButtons from '../../components/movie-buttons/movie-buttons';
import AddReviewButton from '../../components/add-review-button/add-review-button';

interface MoviePageProps {
  movie: IMovie;
  reviews: IReview[];
}

const MoviePage = ({movie, reviews}: MoviePageProps):JSX.Element => {
  const {name, backgroundImage, genre, released, posterImage, id} = movie;
  const location = useLocation();

  const sameGenreMovies = movies.filter((item) => item.genre === genre);

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

              <MovieButtons>
                <PlayButton id={id.toString()} />
                <MyListButton />
                <AddReviewButton id={id} />
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
          <MovieList movies={sameGenreMovies} filmsAmount={filmsAmountMoviePage} />
        </section>
        <Footer />
      </div>
    </>
  );
};

export default MoviePage;
