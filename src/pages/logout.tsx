import React, {FC, useEffect} from 'react';

import {isAuthenticated} from '../utils/auth';
import Layout from "../components/Layout";
import {navigate} from "@reach/router";

const Logout:FC = () => {

  useEffect(()=>{
    if (!isAuthenticated()) {
      console.log("Navigating back to aaccount")
      navigate('/login/')
    }
  })

  return (
      <Layout title="Redirect to Auth0">
        <h2>Log out in process!</h2>
      </Layout>
    );
};

export default Logout;
