import React from 'react';
import Container from './Container';
import protectedRoute from './protectedRoute';

function Protected(props) {
  return (
    <Container>
      <h1>Proteted route</h1>
    </Container>
  );
}

export default protectedRoute(Protected);
