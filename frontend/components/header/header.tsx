import { FC } from "react";
import { ConnectButton } from "@components/connect-button";
import { NavItem } from "@components/nav-item";
import Link from "next/link";
import styles from "./header.module.scss";

export const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const {} = props;
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Link href="./">
          <h1 className={styles.head}>BlocEvent</h1>
        </Link>
        <NavItem />
        <ConnectButton />
      </div>
    </div>
  );
};

interface HeaderProps {}
