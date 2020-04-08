import React, {FC} from "react";
import Layout from "../components/Layout";
import { Router, RouteComponentProps } from '@reach/router';
import {login} from '../utils/auth'

const Settings:FC<RouteComponentProps> = () => <p>Settings</p>
const Billings:FC<RouteComponentProps> = () => <p>Billings</p>
const Home:FC<RouteComponentProps> = () => <p>Home</p>

const Account:FC = () => {

  login();

  return (<Layout title="Account">
    <Router basepath="/account">
      <Settings path="/settings"/>
      <Billings path="/billing"/>
      <Home path="/"/>
    </Router>
  </Layout>)
}


export default Account;
