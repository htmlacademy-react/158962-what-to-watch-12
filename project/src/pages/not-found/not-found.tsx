import Header from '../../components/header/header';
import styles from './not-found.module.css';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

const NotFound = (): JSX.Element => (
  <div className="container">
    <Header />
    <div className={styles.wrapper}>
      <span className={styles.icon}>😕</span>
      <h1 className={styles.heading}>Oops, this page doesn&rsquo;t exists</h1>
      <Link className={styles.link} to={AppRoute.Root}>Go to main page</Link>
    </div>
  </div>
);

export default NotFound;
