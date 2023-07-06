import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EventRecord } from "./EventRecords";
import { thunkGetAllEvents } from "../../store/events";
import "./Events.css";

function EventPage() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const normalizedGroups = Object.values(events)

  useEffect(() => {
    dispatch(thunkGetAllEvents());
  }, [dispatch]);

  console.log('events:', events); // log the events state to check its contents
  console.log('normalizedGroups:', normalizedGroups); // log the normalizedGroups array to check its contents

  return (
    <>
      <div className="event-list">
        <div className="event-header">
          <Link className="group-list-header-events" to="/events">
            Events
          </Link>
          <Link className="group-list-header-groups" to="/groups">
            Groups
          </Link>
          <p>Events in Meet Here</p>
        </div>
        <p className="event-list-item"></p>
        {normalizedGroups.map((event) => (
          <React.Fragment key={event.id}>
            <EventRecord event={event} />
            <p className="event-list-item"></p>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default EventPage;
