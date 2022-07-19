import {} from "@components";
import { NextPage } from "next";
import { default as NextHead } from "next/head";
import { Fragment } from "react";

const Dashboard: NextPage = () => {
  return (
    <Fragment>
      <NextHead>
        <title>Dashboard | BlocEvent - A decentralized events app</title>
      </NextHead>
    </Fragment>
  );
};
export default Dashboard;
