import React, {FC} from "react";
import Layout from "../components/Layout";
import { Router, RouteComponentProps } from '@reach/router';

const Settings:FC<RouteComponentProps> = () => <p>Settings</p>
const Billings:FC<RouteComponentProps> = () => <p>Billings</p>
const Home:FC<RouteComponentProps> = () => <p>Home</p>

const Account:FC = () =>
  <Layout title="Account">
    <Router basepath="/account">
      <Settings path="/settings"/>
      <Billings path="/billing"/>
      <Home path="/"/>
    </Router>
  </Layout>


export default Account;
