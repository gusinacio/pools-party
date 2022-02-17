import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { QuestionTable } from "../components/QuestionTable";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>GamePools - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <QuestionTable />

      <Footer />
    </>
  );
};

export default Home;
