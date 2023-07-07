import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./GroupDetails.css";

const formatTime = (timeString) => {
  const date = new Date(timeString);
  const formattedDate = date.toISOString().split("T")[0];
  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return `${formattedDate} \u2022 ${formattedTime}`;
};

const GroupEvents = ({ event, group }) => {
  const history = useHistory();
  const groups = useSelector((state) => state.groups.allGroups);
  // console.log(event);
  if (!group) group = groups[event.groupId];

  const onClick = () => {
    history.push(`/events/${event.id}`);
  };

  return (
    <div className="event-card-dets">
      <article onClick={onClick}>
        <div className="event-card-pic">
          <img alt="event" src={event.previewImage} />
        </div>
        <header className="event-card-header">
          <p className="event-card-date">{formatTime(event.startDate)}</p>
          <h2 className="event-card-title">{event.name}</h2>
          <p className="event-card-location">
            {event.Venue.city}, {event.Venue.state}
          </p>
        </header>
      </article>
      <p className="event-card-description">
        {event.description}
      </p>
    </div>
  );
};

export default GroupEvents;
