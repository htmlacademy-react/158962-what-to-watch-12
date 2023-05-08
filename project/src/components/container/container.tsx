import {ReactNode, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {resetFilmsCount} from '../../store/slices/films-slice/films-slice';
import {useAppDispatch} from '../../hooks';
import {AppRoute} from '../../const';

interface WrapperProps {
  children?: ReactNode;
}

const Wrapper = ({children}: WrapperProps):JSX.Element => {
  const location = useLocation();
  const [resetStatus, setResetStatus] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>();

  const dispatch = useAppDispatch();

  /*if (!currentPath && currentPath !== '') {
    console.log('no path')
    setCurrentPath(location.pathname)
  }

  if (currentPath !== AppRoute.Root) {
    console.log('path is different')
    setCurrentPath(location.pathname);
    setResetStatus(true);
  }

  console.log('pathname:', location.pathname)
  console.log('currentPath:', currentPath)
  console.log('is equal:', location.pathname === currentPath)
  console.log('is at root:', currentPath === AppRoute.Root)

  useEffect(() => {
    console.log('effect')
    dispatch(resetFilmsCount(resetStatus));
    setResetStatus(false);
  }, [resetStatus, dispatch])*/


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>{children}</div>
  )
}

export default Wrapper;
