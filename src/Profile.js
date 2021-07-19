import Auth from '@aws-amplify/auth';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import React, { useEffect, useState } from 'react';
import Container from './Container';

function Profile() {
  useEffect(() => {
    checkUser();
  }, []);

  const [user, setUser] = useState({});

  const checkUser = async () => {
    try {
      const data = await Auth.currentUserPoolUser();
      const userInfo = { username: data.username, ...data.attributes };
      setUser(userInfo);
    } catch (err) {
      console.log('error: ', err);
    }
  };

  return (
    <Container>
      <h1>Profile</h1>
      <h2>Username: {user.username}</h2>
      <h3>Email: {user.email}</h3>
      <h4>Phone: {user.phone_number}</h4>
      <AmplifySignOut />
    </Container>
  );
}

export default withAuthenticator(Profile);
