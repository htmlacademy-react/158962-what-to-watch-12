import cn from 'classnames';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

interface LogoProps {
  logoModClass?: string;
}

const Logo = ({logoModClass}: LogoProps):JSX.Element => (
  <div className="logo">
    <Link to={AppRoute.Root} className={cn('logo__link', logoModClass)}>
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Link>
  </div>
);

export default Logo;
