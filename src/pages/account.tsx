import React, {FC} from "react";
import Layout from "../components/Layout";
import { Router, RouteComponentProps } from '@reach/router';

const Settings:FC<RouteComponentProps> = () => <p>Settings</p>
const Billings:FC<RouteComponentProps> = () => <p>Billings</p>

const Account:FC = () =>
  <Layout title="Account">
    <Router>
      <Settings path="account/settings"/>
      <Billings path="account/billing"/>
    </Router>
  </Layout>


export default Account;
