import Auth from '@aws-amplify/auth';
import React, { useEffect } from 'react';
import Container from './Container';

function Protected(props) {
  useEffect(() => {
    Auth.currentAuthenticatedUser().catch(() => {
      props.history.push('/profile');
    });
  }, []);

  return (
    <Container>
      <h1>Proteted route</h1>
    </Container>
  );
}

export default Protected;
