import Auth from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { withAuthenticator } from '@aws-amplify/ui-react';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Container from './Container';
import Form from './Form';

function Profile() {
  useEffect(() => {
    checkUser();
    Hub.listen('auth', data => {
      const { payload } = data;
      if (payload.event === 'signOut') {
        setUser(null);
      }
    });
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

  const signOut = () => {
    Auth.signOut().catch(err => console.log('error signing out: ', err));
  };

  if (user) {
    return (
      <Container>
        <h1>Profile</h1>
        <h2>Username: {user.username}</h2>
        <h3>Email: {user.email}</h3>
        <h4>Phone: {user.phone_number}</h4>
        <Button onClick={signOut} title='Sign Out' />
      </Container>
    );
  }
  return <Form setUser={setUser} />;
}

export default withAuthenticator(Profile);
