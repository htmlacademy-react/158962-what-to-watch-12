import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres-list/genres-list';
import MovieList from '../../components/movie-list/movie-list';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import {DEFAULT, MAX_STEP} from '../../const';
import MovieCardPoster from '../../components/movie-card-poster/movie-card-poster';
import MovieButtons from '../../components/movie-buttons/movie-buttons';
import PlayButton from '../../components/play-button/play-button';
import MyListButton from '../../components/my-list-button/my-list-button';
import Spinner from '../../components/spinner/spinner';
import FullPageError from '../../components/full-page-error/full-page-error';
import { useAppSelector } from '../../hooks';
import {selectFilms, selectFilmsStatus, selectGenre, selectRemainFilmsAmount} from '../../store/slices/films-slice/films-slice';
import {selectPromoFilm, selectPromoStatus} from '../../store/slices/promo-film-slice/promo-film-slice';
import {useEffect, useState} from 'react';

const Main = (): JSX.Element => {
  const remainFilmsAmount = useAppSelector(selectRemainFilmsAmount)
  const movies = useAppSelector(selectFilms);
  const status = useAppSelector(selectFilmsStatus);
  const promoFilmStatus = useAppSelector(selectPromoStatus);
  const promoMovie = useAppSelector(selectPromoFilm);
  const currentGenre = useAppSelector(selectGenre);
  const genresList = [...new Set (movies.map((film) => film.genre))];

  const filteredMovies = movies.filter((film) => currentGenre === DEFAULT ? film : film.genre === currentGenre);

  const [maxAmountToShow, setMaxToShow] = useState(MAX_STEP);
  const [remainFilmsCount, setRemainFilmsCount] = useState(remainFilmsAmount);

  useEffect(() => {
    setRemainFilmsCount(remainFilmsAmount)
  }, [remainFilmsAmount]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  const onButtonShowMoreClick = () => {
    setMaxToShow(prev => prev + MAX_STEP);
    setRemainFilmsCount(prev => prev - maxAmountToShow)
  }

  if (status.isError || promoFilmStatus.isError) {
    return <FullPageError />;
  }

  if (promoMovie === null || status.isLoading || promoFilmStatus.isLoading) {
    return <Spinner />;
  }



  const isButtonShow = filteredMovies.length > MAX_STEP && remainFilmsCount >= 0;

  const {
    name: promoName,
    posterImage: promoPosterImage,
    genre: promoGenre,
    released: promoReleased,
    id: promoId,
    backgroundImage} = promoMovie;

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={promoName} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header className="film-card__head" />

        <div className="film-card__wrap">
          <div className="film-card__info">

            <MovieCardPoster photoUrl={promoPosterImage} name={promoName} />

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoMovie.name}</h2>
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

          <GenresList currentGenre={currentGenre} genresList={genresList} />

          <MovieList maxAmountToShow={maxAmountToShow} movies={filteredMovies} />

          {
            isButtonShow && <ShowMoreButton onButtonShowMoreClick={onButtonShowMoreClick} />
          }

        </section>

        <Footer />
      </div>
    </>
  );
};

export default Main;
