import React from "react";
import { useHistory } from "react-router-dom";

export const EventRecord = ({ event }) => {
  const history = useHistory();

  const eventStatus = () => {
    if (event.private === true) {
      return "events: Private";
    } else {
      return "events: Public";
    }
  };

  const eventHistory = () => {
    history.push(`/events/${event.id}`);
  };

  return (
    <div onClick={eventHistory} className="group-record-div">
      <img
        className="group-record-img"
        width="200"
        height="150"
        src={event.previewImage}
        alt="Event Preview"
      ></img>
      <div
        className="group-individual-record"
        to={{ pathname: `/groups/${event.id}`, state: {} }}
      >
        {event.name}
      </div>
      <p className="group-location">
        {event.city}, {event.state}
      </p>
      <p className="group-about">{event.about}</p>
      <p className="group-event">
        {event.Events} · {eventStatus()}
      </p>
    </div>
  );
};
