import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EventRecord } from "./EventRecords";
import * as eventActions from '../../store/events';
import "./Events.css";

function EventPage() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const normalizedGroups = events && events.allGroups ? Object.values(events.allGroups) : [];

  useEffect(() => {
    dispatch(eventActions.thunkGetAllEvents());
  }, [dispatch]);

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
          <>
          <EventRecord event={event} key={events.id} />
          <p className="event-list-item"></p>
          </>
        ))}
      </div>
    </>
  );
}

export default EventPage;
