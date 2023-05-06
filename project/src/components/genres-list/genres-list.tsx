import { GENRES_LIST } from '../../const';

const GenresList = ():JSX.Element => (
  <ul className="catalog__genres-list">
    {
      GENRES_LIST.map((name) => (
        <li key={name} className="catalog__genres-item">
          <a href="#" className="catalog__genres-link">{name}</a>
        </li>
      ))
    }
  </ul>
);

export default GenresList;
