import { FC } from "react";
import styles from "./nav-item.module.scss";

export const NavItem: FC = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>Dashboard</li>
        <li>Dashboard</li>
        <li>Dashboard</li>
      </ul>
    </nav>
  );
};
