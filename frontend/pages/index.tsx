// import Head from "next/head";
// import styles from "../styles/Home.module.css";
import type { NextPage } from "next";
import { Fragment } from "react";
import { IndexHero } from "@components/heros";
import { HowItWorksSection, PartnerSection } from "@components/sections";

const Home: NextPage = () => {
  return (
    <Fragment>
      <IndexHero />
      <HowItWorksSection />
      <PartnerSection />
    </Fragment>
  );
};

export default Home;
