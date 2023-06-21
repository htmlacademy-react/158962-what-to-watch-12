import Logo from '../logo/logo';
import { ReactNode } from 'react';
import cn from 'classnames';

interface HeaderProps {
  className?: string;
  children?: ReactNode;
}

const Header = ({children, className}: HeaderProps):JSX.Element => (
  <header className={cn('page-header', className)}>
    <Logo />
    {children}
  </header>
);

export default Header;
