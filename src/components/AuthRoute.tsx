import { useEffect, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import { fetchAuth } from '../firebase';
import routes from '../utils/routes';

const AuthRoute = ({ ...routeProps }: RouteProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    fetchAuth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      }

      setCheckingStatus(false);
    });
  }, []);

  return (
    <>
      {checkingStatus ? (
        <p>Securing authentication...</p>
      ) : isLoggedIn ? (
        <Route {...routeProps} />
      ) : (
        <Redirect to={routes.login} />
      )}
    </>
  );
};

export default AuthRoute;
