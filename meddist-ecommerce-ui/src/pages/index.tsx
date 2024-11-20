/** @format */

import Head from "next/head";

import Layout from "../components/Layout/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>MedDist</title>
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
      <Layout>
        <></>
      </Layout>
    </>
  );
}
