import ReviewForm from '../../components/review-form/review-form';
import UserBlock from '../../components/user-block/user-block';
import Header from '../../components/header/header';
import { generatePath, Link } from 'react-router-dom';
import {IMovie} from '../../types/Movie';
import MovieCardPoster from '../../components/movie-card-poster/movie-card-poster';
import {AppRoute} from '../../const';

interface AddReviewProps {
  movie: IMovie;
}

const AddReview = ({movie}: AddReviewProps):JSX.Element => {
  const {name, posterImage, backgroundImage, id} = movie;
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={generatePath(AppRoute.Film, { id: `${id}`})} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </Header>

        <MovieCardPoster className="film-card__poster--small" photoUrl={posterImage} name={name} />

      </div>

      <div className="add-review">
        <ReviewForm />
      </div>

    </section>
  );
};

export default AddReview;
