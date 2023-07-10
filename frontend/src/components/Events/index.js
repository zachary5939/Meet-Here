import React, { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetAllEvents } from "../../store/events";
import { EventRecord } from "./EventRecords";
import "./Events.css";

const EventPage = () => {
  const dispatch = useDispatch();
  const eventdata = useSelector((state) => state.events);
  const time = new Date();
  const upcomingEvents = [];
  const pastEvents = [];
  const events = Object.values(Object.values(eventdata)[0]);

  useEffect(() => {
    dispatch(thunkGetAllEvents());
  }, [dispatch]);

  for (let event of events) {
    console.log('eventt', event)
    if (new Date(event.startDate) > time) {
      upcomingEvents.push(event);
    } else {
      pastEvents.push(event);
    }
  }

  upcomingEvents.sort((a, b) => {
    return new Date(a.startDate) - new Date(b.startDate);
  });

  pastEvents.sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });
  const sortedEvents = upcomingEvents.concat(pastEvents);
  return (
    <>
     <div className="group-list">
      <div className="event-header">
        <Link className="event-list-header-events" to="/events">
          Events
        </Link>
        <Link className="event-list-header-groups" to="/groups">
          Groups
        </Link>
      </div>
      <div>
        <p className="events-in-meethere">Events in Meet Here</p>
      </div>
      {sortedEvents.map((event, index) => (
        <React.Fragment key={index}>
          {<EventRecord event={event} />}
        </React.Fragment>
      ))}
    </div>
    </>
  );
};

export default EventPage;
