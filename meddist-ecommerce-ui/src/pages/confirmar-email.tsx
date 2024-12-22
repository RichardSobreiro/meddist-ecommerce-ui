/** @format */

import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import ConfirmEmail from "@/components/ConfirmEmail";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>MedDist - Confirmar Email</title>
        <meta
          name="description"
          content="Distribuidora de medicamentos e materiais hospitalares - Venda de luvas, aventais, máscaras e muito mais"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="keywords"
          content="medicamentos, dipirona, aspirina, luvas, máscaras, aventais, materiais hospitalares"
        />
        <meta name="language" content="pt-BR" />
      </Head>
      <Layout noHeader={false}>
        <ConfirmEmail />
      </Layout>
    </>
  );
};

export default Login;
