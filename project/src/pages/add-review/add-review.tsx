import ReviewForm from '../../components/review-form/review-form';
import UserBlock from '../../components/user-block/user-block';
import Header from '../../components/header/header';
import {generatePath, Link, useParams} from 'react-router-dom';
import MovieCardPoster from '../../components/movie-card-poster/movie-card-poster';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {selectFilms} from '../../store/slices/films-slice/films-slice';
import {IMovie} from '../../types/movie';


const AddReview = ():JSX.Element => {
  const movies = useAppSelector(selectFilms);
  const { id: currentId } = useParams();
  const currentMovie = movies.find((movie) => movie.id.toString() === currentId) as IMovie;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={currentMovie.backgroundImage} alt={currentMovie?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={generatePath(AppRoute.Film, { id: `${currentMovie.id}`})} className="breadcrumbs__link">{currentMovie.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </Header>

        <MovieCardPoster className="film-card__poster--small"
          photoUrl={currentMovie.posterImage}
          name={currentMovie.name}
        />

      </div>

      <div className="add-review">
        <ReviewForm currentId={Number(currentId)} />
      </div>

    </section>
  );
};

export default AddReview;
