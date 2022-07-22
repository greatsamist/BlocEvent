import { FC, Fragment } from "react";
import styles from "./partners.module.scss";

export const PartnerSection: FC = () => {
  return (
    <Fragment>
      <div className={styles.container}>
        <h1 className={styles.heading}>Partners</h1>
        <div className={styles.partners}>
          <div className={styles.partners__box}>Box</div>
          <div className={styles.partners__box}> </div>
          <div className={styles.partners__box}> </div>
        </div>
      </div>
    </Fragment>
  );
};
