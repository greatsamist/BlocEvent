import { FC } from "react";
import styles from "./index-hero.module.scss";
import Link from "next/link";

export const IndexHero: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.innerLeft}>
          <h2 className={styles.heading}>
            Be in <span>control</span> of all your activities and events
          </h2>
          <p className={styles.heading__sub}>
            Auto mint with PAOP integration for all attendee
          </p>
          <div className={styles.button}>
            <Link href="./create">
              <button className={styles.button__btn}>Create Event</button>
            </Link>
            <Link href="./events">
              <button className={styles.button__btnNbg}>Buy Ticket</button>
            </Link>
          </div>
        </div>
        <div className={styles.innerRight}>
          <img className={styles.image} src="./DRIP_12.png" alt="home image" />
        </div>
      </div>
    </div>
  );
};
