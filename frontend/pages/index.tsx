import { Fragment } from "react";
import { IndexHero } from "@components/heros";
import { HowItWorksSection, PartnerSection } from "@components/sections";
import type { NextPage } from "next";

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
