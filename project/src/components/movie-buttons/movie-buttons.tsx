import {ReactNode} from 'react';

interface MovieButtonsProps {
  children: ReactNode;
}

const MovieButtons = ({children}: MovieButtonsProps):JSX.Element => (
  <div className="film-card__buttons">
    {children}
  </div>
);

export default MovieButtons;
