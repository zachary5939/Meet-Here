import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./GroupDetails.css";

export const GroupEvents = ({ events }) => {
  const upcomingEvent = [];
  const pastEvent = [];
  const time = new Date();
  const history = useHistory();

  for (let event of events) {
    if (event.previewImage === undefined) {
      event.previewImage =
        "https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg";
    }
    if (new Date(event.startDate) > time) {
      upcomingEvent.push(event);
    } else {
      pastEvent.push(event);
    }
  }

  upcomingEvent.sort((a, b) => {
    return new Date(a.startDate) - new Date(b.startDate);
  });

  pastEvent.sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });

  const navigateToEvent = (eventId) => {
    history.push(`/events/${eventId}`);
  };

  return (
    <>
      <div style={{ marginTop: "1.25rem" }}>
        <h2 style={{ marginTop: "0px", marginBottom: "0px" }}>
          {upcomingEvent.length > 0
            ? `Upcoming Events (${upcomingEvent.length})`
            : ""}
        </h2>

        {upcomingEvent.map((event) => (
          <div key={event.id}>
            <div className="event-cards">
              <div className="event-cards-image">
                <img
                  alt=""
                  onClick={() => navigateToEvent(event.id)}
                  src={event.previewImage}
                  width={180}
                  height={120}
                  style={{ marginLeft: "1rem", marginTop: "1.25rem" }}
                ></img>
              </div>
              <div className="event-cards-info">
                <p className="event-cards-info-time">
                  {event.startDate.split("T")[0]} · {"<"}
                  {event.startDate.split("T")[1].split(".")[0]}
                  {">"}
                </p>
                <p className="event-cards-info-name">{event.name}</p>
                <p className="event-cards-info-location">
                  {event.Group.city}, {event.Group.state}
                </p>
              </div>
              <div className="event-cards-description">
                <p>{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <h2 style={{ marginTop: "0px", marginBottom: "0px" }}>
          {pastEvent.length > 0 ? `Past Events (${pastEvent.length})` : ""}
        </h2>

        {pastEvent.map((event) => (
          <div key={event.id}>
            <div className="event-cards">
              <div className="event-cards-image">
                <img
                  alt=""
                  onClick={() => navigateToEvent(event.id)}
                  src={event.previewImage}
                  width={180}
                  height={120}
                  style={{ marginLeft: "1rem", marginTop: "1.25rem" }}
                ></img>
              </div>
              <div className="event-cards-info">
                <p className="event-cards-info-time">
                  {event.startDate.split("T")[0]} · {"<"}
                  {event.startDate.split("T")[1].split(".")[0]}
                  {">"}
                </p>
                <p className="event-cards-info-name">{event.name}</p>
                <p className="event-cards-info-location">
                  {event.Group.city}, {event.Group.state}
                </p>
              </div>
              <div className="event-cards-description">
                <p>{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default GroupEvents;
