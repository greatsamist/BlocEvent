import Link from "next/link";
import styles from "./nav-item.module.scss";
import { FC } from "react";
import { useRouter } from "next/router";

export const NavItem: FC = () => {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <ul>
        <Link href="./">
          <li
            className={
              router.asPath === "/" ? styles.nav__homeActive : styles.nav__home
            }
          >
            Home
          </li>
        </Link>
        <Link href="./dashboard">
          <li
            className={
              router.asPath === "/dashboard"
                ? styles.nav__liActive
                : styles.nav__li
            }
          >
            Dashboard
          </li>
        </Link>
        <Link href="/create">
          <li
            className={
              router.asPath === "/create"
                ? styles.nav__liActive
                : styles.nav__li
            }
          >
            Create Event
          </li>
        </Link>
        <Link href="/buy">
          <li
            className={
              router.asPath === "/buy" ? styles.nav__liActive : styles.nav__li
            }
          >
            Buy Tickets
          </li>
        </Link>
      </ul>
    </nav>
  );
};
