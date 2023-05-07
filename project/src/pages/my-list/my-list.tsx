import Footer from '../../components/footer/footer';
import { filmsAmountMyList } from '../../const';
import MovieList from '../../components/movie-list/movie-list';
import Header from '../../components/header/header';
import UserBlock from '../../components/user-block/user-block';
import {IMovie} from '../../types/movie';

interface MyListProps {
  movies: IMovie[];
}

const MyList = ({movies}: MyListProps):JSX.Element => (
  <div className="user-page">
    <Header className="user-page__head">
      <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
      <UserBlock />
    </Header>

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <MovieList movies={movies} filmsAmount={filmsAmountMyList} />
    </section>

    <Footer />
  </div>
);

export default MyList;
