import { Fragment, useState } from "react";
import styles from "../styles/dashboard.module.scss";
import { AuctionTicket, MyEvents } from "@components/sections";
import { DashboardNavItem } from "@components/nav-item";
import { NextPage } from "next";
import { default as NextHead } from "next/head";

const Dashboard: NextPage = () => {
  const [sec, setSec] = useState("");
  const whatSection = (section: string) => {
    setSec(section);
  };

  return (
    <Fragment>
      <NextHead>
        <title>Dashboard | BlocEvent - A decentralized events app</title>
      </NextHead>
      <div className={styles.container}>
        <div className={styles.content}>
        <div>
          <DashboardNavItem func={whatSection} />
        </div>

        <div className={styles.dashSection}>
          {sec === "MyEvents" ? <MyEvents /> : null}
          {sec === "AuctionTicket" ? <AuctionTicket /> : null}
        </div>
      </div>
      </div>
    </Fragment>
  );
};
export default Dashboard;
