import { FC, Fragment } from "react";
import styles from "./event-item.module.scss";

export const EventItem: FC<eventArr> = ({
  id,
  eventName,
  organizers,
  eventFile,
}: eventArr) => {
  const image = eventFile.replace("ipfs://", "https://ipfs.io/ipfs/");

  return (
    <Fragment>
     
        <li className={styles.list}>{id}</li>
        <li>{eventName}</li>
        <li>{organizers}</li>
        <img src={image} alt="event image" />
      
    </Fragment>
  );
};

interface eventArr {
  id: string;
  eventName: string;
  participantsNumber: number;
  eventType: string;
  organizers: string;
  category: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  description: string;
  ticketPrice: number;
  eventFile: string;
}
