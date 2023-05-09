import React, {ReactNode} from 'react';

interface SignInMessageProps {
  children: ReactNode;
}

const SignInMessage = ({children}: SignInMessageProps): JSX.Element => {
  return (
    <div className="sign-in__message">
      {children}
    </div>
  );
};

export default SignInMessage;
