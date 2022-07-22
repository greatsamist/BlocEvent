// import Head from "next/head";
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
