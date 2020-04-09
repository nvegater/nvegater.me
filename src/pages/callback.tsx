import React, {FC} from "react";
import Layout from "../components/Layout";
import {handleAuthentication} from "../utils/auth";
import {navigate} from "@reach/router";


const Callback:FC = () => {
  handleAuthentication(() => navigate('/account/'));
  return (
    <Layout title="Callback">
      <h2>Logging you in...</h2>
    </Layout>
  )
}


export default Callback;
