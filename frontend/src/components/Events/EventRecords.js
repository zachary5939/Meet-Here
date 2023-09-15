import React from "react";
import { useHistory } from "react-router-dom";

export const EventRecord = ({ event }) => {
  const history = useHistory();

  const eventHistory = () => {
    history.push(`/events/${event.id}`);
  };

  if (!event.Group) {
    event.Group = { city: "", state: "" };
  }

  if (
    event.previewImage === "no preview image" ||
    event.previewImage === undefined
  ) {
    event.previewImage =
      "https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg";
  }

  return (
    <div onClick={eventHistory} className="event-record-div" style={{ cursor: "pointer" }}>
      <img
        className="event-record-img"
        width="250"
        height="150"
        src={event?.previewImage}
        alt="Event Preview"
      ></img>
      <p className="event-list-info-time">
        {event?.startDate && event.startDate.split("T")[0]} · {}
        {event?.startDate && event.startDate.split("T")[1].split(".")[0]}
      </p>
      <div
        className="event-individual-record"
        to={{ pathname: `/events/${event.id}`, state: {} }}
      >
        {event.name}
      </div>
      <p className="event-location">
        {event?.Group?.city}, {event?.Group?.state}
      </p>
    </div>
  );
};
