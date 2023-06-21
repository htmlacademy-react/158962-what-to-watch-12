import cn from 'classnames';

interface MovieCardPosterProps {
  className?: string;
  photoUrl?: string;
  name?: string;
}

const MovieCardPoster = ({className, photoUrl, name}: MovieCardPosterProps):JSX.Element => (
  <div className={cn('film-card__poster', className)}>
    <img src={photoUrl}
      alt={name}
      width="218"
      height="327"
    />
  </div>
);

export default MovieCardPoster;
