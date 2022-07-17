import styles from "./header.module.scss";
import { NavItem } from "@components/nav-item";
import { ConnectButton } from "@components/connect-button";
import { FC } from "react";
import Link from "next/link";

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
