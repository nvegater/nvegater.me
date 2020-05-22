import React, {FC} from "react";
import {graphql} from "gatsby";

import Layout from "../components/Layout";

interface Country {
  id: string;
  countryName: string;
}

interface PageQueryData {
  DJANGO: {
      countries: Country[];
    }
}

export const query = graphql`
  query {
    DJANGO{
      countries{
        id
        countryName
      }
    }
  }
`;

interface VeganStockProps {
  readonly data: PageQueryData;
}

const VeganStock: FC<VeganStockProps> = ({data}) => {

  console.log(data.DJANGO)

  return <Layout>

    <h2>Vegan Stock Webpage</h2>
    <h3>Providers from this countries: </h3>
    {
      data.DJANGO.countries.map((country, i)=>
        <h4 key={i}>
          {country.countryName}
        </h4>
      )
    }

  </Layout>
}

export default VeganStock;
