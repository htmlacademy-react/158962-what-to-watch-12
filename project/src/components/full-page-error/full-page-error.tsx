import styles from './page-error.module.css';

const FullPageError = ():JSX.Element =>

  (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.errorText}>Ups, something went wrong and we cannot get offers</p>
      </div>

    </div>
  );
export default FullPageError;
