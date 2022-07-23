import { Fragment } from "react";
import { NextPage } from "next";
import { default as NextHead } from "next/head";

const Events: NextPage<{ eventData: eventDataProps[] }> = ({ eventData }) => {
  console.log(eventData);
  return (
    <Fragment>
      <NextHead>
        <title>All Events | BlocEvent - A decentralized events app</title>
      </NextHead>
      {/* <EventList events={eventData} /> */}
    </Fragment>
  );
};

export async function getStaticProps() {
  // fetch data from api
  const res = await fetch("https://blockevents.herokuapp.com/events");

  const eventData = await res.json();

  return {
    props: {
      events: eventData,
    },
    revalidate: 10,
  };
}
export default Events;

interface eventDataProps {
  eventData: {
    eventName: string;
  };
}
