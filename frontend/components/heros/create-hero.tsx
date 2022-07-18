import { FC } from "react";
import styles from "./create-hero.module.scss";

export const CreateHero: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.innerLeft}>
          <h1 className={styles.heading}>
            Create your <span>event</span> with our custom templates that works
            for all
          </h1>
          <p className={styles.heading__sub}>
            Fill your event details with with ease
          </p>
        </div>
        <div className={styles.innerRight}>
          <img className={styles.image} src="./DRIP_12.png" alt="home image" />
        </div>
      </div>
    </div>
  );
};
