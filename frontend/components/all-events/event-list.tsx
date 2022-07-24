import { EventItem } from "@components";
import { FC, Fragment } from "react";
import styles from "./event-list.module.scss";

export const EventList: FC<eventDataProps> = ({ events }: eventDataProps) => {
  console.log(events);
  return (
    <Fragment>
      <div className={styles.container}>
        <ul className={styles.list}>
          {events.map((event) => (
            <EventItem
              key={event.id}
              id={event.id}
              eventName={event.eventName}
              organizers={event.organizers}
              participantsNumber={event.participantsNumber}
              eventType={event.eventType}
              category={event.category}
              eventDate={event.eventDate}
              startTime={event.startTime}
              endTime={event.endTime}
              description={event.description}
              ticketPrice={event.ticketPrice}
              eventFile={event.eventFile}
            />
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export interface eventArr {
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

export interface eventDataProps {
  events: eventArr[];
}
