import Auth from '@aws-amplify/auth';
import React, { useState } from 'react';
import ConfirmSignUp from './ConfirmSignUp';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordSubmit from './ForgotPasswordSubmit';
import SignIn from './SignIn';
import SignUp from './SignUp';

const initialFormState = {
  username: '',
  password: '',
  email: '',
  confirmationCode: ''
};

function Form(props) {
  const [formType, updateFormType] = useState('signIn');
  const [formState, updateFormState] = useState(initialFormState);

  const updateForm = event => {
    const newFormState = {
      ...formState,
      [event.target.name]: event.target.value
    };
    updateFormState(newFormState);
  };

  const signIn = async ({ username, password }, setUser) => {
    try {
      const user = await Auth.signIn(username, password);
      const userInfo = { username: user.username, ...user.attributes };
      setUser(userInfo);
    } catch (err) {
      console.log('error signing in...', err);
    }
  };

  const signUp = async ({ username, password, email }, updateFormType) => {
    try {
      await Auth.signUp({ username, password, attributes: { email } });
      alert('Sign Up success!');
      updateFormType('confirmSignUp');
    } catch (err) {
      console.log('error signing up...', err);
    }
  };

  const confirmSignUp = async (
    { username, confirmationCode },
    updateFormType
  ) => {
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      updateFormType('signIn');
    } catch (err) {
      console.log('error signing up..', err);
    }
  };

  const forgotPassword = async ({ username }, updateFormType) => {
    try {
      await Auth.forgotPassword(username);
      updateFormType('forgotPasswordSubmit');
    } catch (err) {
      console.log('error submitting username to reset password...', err);
    }
  };

  const forgotPasswordSubmit = async (
    { username, confirmationCode, password },
    updateFormType
  ) => {
    try {
      await Auth.forgotPasswordSubmit(username, confirmationCode, password);
      updateFormType('signIn');
    } catch (err) {
      console.log('error updating password... ', err);
    }
  };

  function renderForm() {
    switch (formType) {
      case 'signUp':
        return (
          <SignUp
            signUp={() => signUp(formState, updateFormType)}
            updateFormState={e => updateForm(e)}
          />
        );
      case 'confirmSignUp':
        return (
          <ConfirmSignUp
            confirmSignUp={() => confirmSignUp(formState, updateFormType)}
            updateFormState={e => updateForm(e)}
          />
        );
      case 'signIn':
        return (
          <SignIn
            signIn={() => signIn(formState, props.setUser)}
            updateFormState={e => updateForm(e)}
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPassword
            forgotPassword={() => forgotPassword(formState, updateFormType)}
            updateFormState={e => updateForm(e)}
          />
        );
      case 'forgotPasswordSubmit':
        return (
          <ForgotPasswordSubmit
            forgotPasswordSubmit={() =>
              forgotPassword(formState, updateFormType)
            }
            updateFormState={e => updateForm(e)}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div>
      {renderForm()}
      {formType === 'signUp' && (
        <p style={styles.toggleForm}>
          Already have an account ?{' '}
          <span style={styles.anchor} onClick={() => updateFormType('signIn')}>
            Sign In
          </span>
        </p>
      )}
      {formType === 'signIn' && (
        <>
          <p style={styles.toggleForm}>
            Need an account ?{' '}
            <span
              style={styles.anchor}
              onClick={() => updateFormType('signUp')}
            >
              Sign Up
            </span>
          </p>
          <p style={{ ...styles.toggleForm, ...styles.resetPassword }}>
            Forget your password ?{' '}
            <span
              style={styles.anchor}
              onClick={() => updateFormType('forgotPassword')}
            >
              Reset password
            </span>
          </p>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '150px',
    justifyContent: 'center',
    alingItems: 'center'
  },
  input: {
    height: '45px',
    marginTop: '8px',
    width: '300px',
    maxWidth: '300px',
    padding: '0px 8px',
    fontSize: '16px',
    outline: 'none',
    border: 'none',
    borderBottom: '2px solid rgba(0,0,0, .3)'
  },
  toggleForm: {
    fotnWeight: '600',
    padding: '0px 25px',
    marginTop: '15px',
    marginBottom: 0,
    textAlign: 'center',
    color: 'rgba(0,0,0, .6)'
  },
  resetPassword: {
    marginTop: '5px'
  },
  anchor: {
    color: '#006bfc',
    cursor: 'pointer'
  }
};

export { styles, Form as default };
