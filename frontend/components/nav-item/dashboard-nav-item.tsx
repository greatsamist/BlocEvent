import { FC, Fragment, useState } from "react";
import { Image2, Ticket, TicketStar } from "react-iconly";
import styles from "./dashboard-nav-item.module.scss";

export let DashboardNav: string;

export const DashboardNavItem: FC<DashboardNavItemProps> = (
  props: DashboardNavItemProps
) => {
  const [sec, setSec] = useState("MyEvents");
  props.func(sec);

  return (
    <Fragment>
      <nav className={styles.navItem}>
        <ul>
          <li onClick={() => setSec("MyEvents")}>
            <TicketStar
              set="curved"
              primaryColor="currentColor"
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            My Events
          </li>
          <ul>
            <li>
              <Ticket
                set="curved"
                primaryColor="currentColor"
                style={{ verticalAlign: "middle", marginRight: "8px" }}
              />
              Ticket Sold
            </li>
            <li>
              <Ticket
                set="curved"
                primaryColor="currentColor"
                style={{ verticalAlign: "middle", marginRight: "8px" }}
              />
              Ticket Sold
            </li>
            <li>
              <Ticket
                set="curved"
                primaryColor="currentColor"
                style={{ verticalAlign: "middle", marginRight: "8px" }}
              />
              Ticket Sold
            </li>
          </ul>
          <li onClick={() => setSec("AuctionTicket")}>
            <Ticket
              set="curved"
              primaryColor="currentColor"
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            Auction Ticket
          </li>
          <li onClick={() => setSec("poap")}>
            <Image2
              set="curved"
              primaryColor="currentColor"
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            POAP
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export interface DashboardNavItemProps {
  func: Function;
}
