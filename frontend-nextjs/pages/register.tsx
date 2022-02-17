import type { NextPage } from "next";
import Head from "next/head";
import { CenteredForm } from "../components/CenteredElement";
import { RegisterForm } from "../components/CenteredElement/RegisterForm";

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>GamePools - Cadastro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CenteredForm form={<RegisterForm />} />
    </>
  );
};

export default Register;
