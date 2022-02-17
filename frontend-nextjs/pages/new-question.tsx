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
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <Header />

        <CenteredForm form={<NewQuestionForm />} />

        <Footer />
      </>
    );
  };
  
  export default NewQuestion;