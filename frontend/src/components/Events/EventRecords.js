import React from "react";
import { useHistory } from "react-router-dom";

export const EventRecord = ({ event }) => {
  const history = useHistory();

  const eventHistory = () => {
    history.push(`/events/${event.id}`);
  };

  return (
    <>
      <div onClick={eventHistory} className="event-record-div">
        <img
          className="group-record-img"
          width="200"
          height="150"
          src={`${event.previewImage}`}
          alt="Event Preview"
        ></img>
        <div
          className="group-individual-record"
          to={{ pathname: `/events/${event.id}`, state: {} }}
        >
          {event.name}
        </div>
        <p className="group-location">
          {event.city}, {event.state}
        </p>
        <p className="event-list-info-location">
          {event.Group.city}, {event.Group.state}
        </p>
      </div>
    </>
  );
};
