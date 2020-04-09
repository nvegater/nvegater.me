import React, {FC} from 'react';

import {login, logout} from '../utils/auth';
import Layout from "../components/Layout";

const Login:FC = () => {

  const handleLogin = () => {
      login();
  }
  const handleLogout = () => {
      logout();
  }
  return (
      <Layout title="Redirect to Auth0">
        <h2>Login!</h2>
        <button onClick={handleLogin}>
          Log in
        </button>
        <button onClick={handleLogout}>
          Log out
        </button>
      </Layout>
    );
};

export default Login;
