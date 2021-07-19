import Auth from '@aws-amplify/auth';
import React, { useEffect } from 'react';

const protectedRoute = (Comp, route = '/profile') => props => {
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
    } catch (err) {
      props.history.push(route);
    }
  }

  useEffect(() => {
    checkAuthState();
  }, []);

  return <Comp {...props} />;
};

export default protectedRoute;
