import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres-list/genres-list';
import MovieList from '../../components/movie-list/movie-list';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import {filmsAmountMain} from '../../const';
import {IMovie} from '../../types/Movie';
import MovieCardPoster from '../../components/movie-card-poster/movie-card-poster';
import MovieButtons from '../../components/movie-buttons/movie-buttons';
import PlayButton from '../../components/play-button/play-button';
import MyListButton from '../../components/my-list-button/my-list-button';

interface MainProps {
  movies: IMovie[];
  promoMovie: IMovie;
}

const Main = ({movies, promoMovie}: MainProps): JSX.Element => {
  const {name: promoName, posterImage: promoPosterImage, genre: promoGenre, released: promoReleased, id: promoId} = promoMovie;

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt={promoName} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header className="film-card__head" />

        <div className="film-card__wrap">
          <div className="film-card__info">

            <MovieCardPoster photoUrl={promoPosterImage} name={promoName} />

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoName}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoGenre}</span>
                <span className="film-card__year">{promoReleased}</span>
              </p>

              <MovieButtons>
                <PlayButton id={promoId.toString()} />
                <MyListButton />
              </MovieButtons>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          <MovieList movies={movies} filmsAmount={filmsAmountMain} />

          <ShowMoreButton />
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Main;
