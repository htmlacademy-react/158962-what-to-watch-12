import {AppRoute} from '../../const';
import {generatePath, useNavigate} from 'react-router-dom';

interface PlayButtonProps {
  id: string;
}

const PlayButton = ({id}: PlayButtonProps):JSX.Element => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(generatePath(AppRoute.Player, {id: id}))}
      className="btn btn--play film-card__button"
      type="button"
    >
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
};

export default PlayButton;
