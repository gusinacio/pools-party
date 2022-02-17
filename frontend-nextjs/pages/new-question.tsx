import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CenteredForm } from "../components/CenteredElement";
import { NewQuestionForm } from "../components/CenteredElement/NewQuestionForm";

const NewQuestion: NextPage = () => {
  return (
    <>
      <Head>
        <title>GamePools - Nova Pergunta</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <CenteredForm form={<NewQuestionForm />} />

      <Footer />
    </>
  );
};

export default NewQuestion;
