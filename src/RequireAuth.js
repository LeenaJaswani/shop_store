import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children, isAuthenticated }) {
  let location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /signin page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they sign in, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
