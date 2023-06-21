import Footer from '../../components/footer/footer';
import MovieList from '../../components/movie-list/movie-list';
import Header from '../../components/header/header';
import UserBlock from '../../components/user-block/user-block';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  fetchFavorites,
  selectFavoriteOffers,
  selectFavoriteStatus
} from '../../store/slices/favorites-slice/favorites-slice';
import {useEffect} from 'react';
import Spinner from '../../components/spinner/spinner';
import FullPageError from '../../components/full-page-error/full-page-error';

const MyList = ():JSX.Element => {
  const movies = useAppSelector(selectFavoriteOffers);
  const status = useAppSelector(selectFavoriteStatus);
  const favoriteOffersAmount = movies.length;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());

  }, [dispatch]);

  if (status.isLoading) {
    return <Spinner />;
  }

  if (status.isError) {
    return <FullPageError />;
  }

  const isEmpty = favoriteOffersAmount === 0;

  return (
    <div className="user-page">
      <Header className="user-page__head">
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteOffersAmount}</span></h1>
        <UserBlock />
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        {isEmpty ? <p>Movies list is empty</p> : <MovieList movies={movies} />}
      </section>

      <Footer />
    </div>
  );
};

export default MyList;
