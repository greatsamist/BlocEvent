import styles from "./how-it-works.module.scss";
import { Ticket } from "react-iconly";
import { FC, Fragment } from "react";

export const HowItWorksSection: FC = () => {
  return (
    <Fragment>
      <div className={styles.container}>
        <h1 className={styles.heading}>How it works</h1>
        <div className={styles.content}>
          <div className={styles.content__row}>
            <div className={styles.content__header}>
              <Ticket set="curved" primaryColor="blueviolet" />
              <h3>Create an event</h3>
            </div>
            <p className={styles.content__para}>
              Organizers of event can customize event details and set prices
              also with also proper provision to track the statistics of each
              event
            </p>
          </div>

          <div className={styles.content__row}>
            <div className={styles.content__header}>
              <Ticket set="curved" primaryColor="blueviolet" />
              <h3>Create an event</h3>
            </div>
            <p className={styles.content__para}>
              Organizers of event can customize event details and set prices
              also with also proper provision to track the statistics of each
              event
            </p>
          </div>

          <div className={styles.content__row}>
            <div className={styles.content__header}>
              <Ticket set="curved" primaryColor="blueviolet" />
              <h3>Create an event</h3>
            </div>
            <p className={styles.content__para}>
              Organizers of event can customize event details and set prices
              also with also proper provision to track the statistics of each
              event
            </p>
          </div>

          <div className={styles.content__row}>
            <div className={styles.content__header}>
              <Ticket set="curved" primaryColor="blueviolet" />
              <h3>Create an event</h3>
            </div>
            <p className={styles.content__para}>
              Organizers of event can customize event details and set prices
              also with also proper provision to track the statistics of each
              event
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
