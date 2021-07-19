import React, { useState } from 'react';

const initialFormState = {
  username: '',
  password: '',
  email: '',
  confirmationCode: ''
};

function Form(props) {
  const [formType, updateFormType] = useState('signIn');
  const [formState, updateFormState] = useState(initialFormState);

  function renderForm() {
    return <div>{renderForm()}</div>;
  }
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
