/** @format */

import Head from "next/head";

import Layout from "../components/Layout/Layout";
import ProductList from "../components/Products";
import { PaginationProps } from "../interfaces/Product";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page as string) || 1;
  const limit = 9;
  const offset = (page - 1) * limit;

  try {
    // Fetch data from an API or simulate fetching data
    const response = await fetch(
      `http://localhost:3001/products?offset=${offset}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();

    return {
      props: {
        products: data.products,
        page: page,
        total: data.total,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    // Here you can handle errors depending on your needs
    // Example: Return error page or return default props with error messages
    return {
      props: {
        products: [],
        page: 1,
        total: 0,
        error: "Failed to load products.",
      },
    };
  }
};

const Home: React.FC<PaginationProps> = ({ products, page, total }) => {
  return (
    <>
      <Head>
        <title>
          MedDist - O melhor lugar para comprar materiais e medicamentos
        </title>
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
        <ProductList products={products} page={page} total={total} />
      </Layout>
    </>
  );
};

export default Home;
