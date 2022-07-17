import { FC } from "react";
import styles from "./index-hero.module.scss";
import btn from "../../styles/button.module.scss";
import Link from "next/link";

export const IndexHero: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.innerLeft}>
          <h1 className={styles.heading}>
            Be in <span>control</span> of all your activities and events
          </h1>
          <p className={styles.heading__sub}>
            Auto mint with PAOP integration for all attendee
          </p>
          <div className={styles.button}>
            <Link href="./create">
              <button className={btn.btn}>Create Event</button>
            </Link>
            <button className={btn.btn}>Buy Ticket</button>
          </div>
        </div>
        <div className={styles.innerRight}>
          <img className={styles.image} src="./DRIP_12.png" alt="home image" />
        </div>
      </div>
    </div>
  );
};
