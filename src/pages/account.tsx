import React, {FC, useEffect, useState} from "react";
import Layout from "../components/Layout";
import { Router, RouteComponentProps } from '@reach/router';
import {getUserInfo, isAuthenticated, logout} from "../utils/auth";

const Settings:FC<RouteComponentProps> = () => <p>Settings</p>
const Billings:FC<RouteComponentProps> = () => <p>Billings</p>
const Home:FC<RouteComponentProps> = () => <p>Home</p>

const Account:FC = () => {

  const [userInfo, setUserInfo] = useState();

  const handleLogout = () => {
    logout();
  }

  useEffect(()=>{
  let userInfo = getUserInfo();
  setUserInfo(userInfo)
  })


  console.log("got this user Info",userInfo);

  return (
    <Layout title="Account">
      {
        isAuthenticated() && userInfo!==undefined &&
          <>
        <Router>
          <Settings path="/account/settings"/>
          <Billings path="/account/billing"/>
          <Home path="/account"/>
        </Router>
        <button onClick={handleLogout}>Logout</button>
          </>
      }
      {
        !isAuthenticated() &&
          <h3>Youre not Registered yet or you havent verified your email</h3>
      }

  </Layout>)
}


export default Account;
