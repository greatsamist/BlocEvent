import Link from "next/link";
import styles from "./nav-item.module.scss";
import { FC } from "react";

export const NavItem: FC = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <Link href="./">
          <li className={styles.nav__home}>Home</li>
        </Link>
        <li>Dashboard</li>
        <Link href="./create">
          <li>Create Event</li>
        </Link>
        <li>Buy Tickets</li>
      </ul>
    </nav>
  );
};
