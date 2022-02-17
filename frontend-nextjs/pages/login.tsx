import type { NextPage } from "next";
import Head from "next/head";
import { CenteredForm } from "../components/CenteredElement";
import { LoginForm } from "../components/CenteredElement/LoginForm";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>GamePools - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CenteredForm form={<LoginForm />} />
    </>
  );
};

export default Login;
