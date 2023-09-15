import { useHistory } from "react-router-dom";
import "./GroupDetails.css"

export const GroupEvents = ({ events }) => {

const upcomingEvent = [];
  const pastEvent = [];
  const time = new Date();
  const history = useHistory();
  const results = []

  for (let event of events) {
    console.log(event.previewImage);
    if (event.previewImage === undefined) {
      event.previewImage = "unavailable";
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
                  onClick={() => history.push(`/events/${event.id}`)}
                  src={event?.previewImage}
                  width={180}
                  height={120}
                  style={{ marginLeft: "1rem", marginTop: "1.25rem" }}
                ></img>
              </div>
              <div className="event-cards-info" onClick={() => history.push(`/events/${event.id}`)}>
                <p className="event-cards-info-time">
                  {event.startDate.split("T")[0]} · {"<"}
                  {event.startDate.split("T")[1].split(".")[0]}
                  {">"}
                </p>
                <p className="event-cards-info-name">{event.name}</p>
                <p className="event-cards-info-location">
                  {event.city}, {event.state}
                </p>
              </div>
              <div className="event-cards-description" onClick={() => history.push(`/events/${event.id}`)}>
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
                  onClick={() => history.push(`/events/${event.id}`)}
                  src={event.previewImage}
                  width={180}
                  height={120}
                  style={{ marginLeft: "1rem", marginTop: "1.25rem" }}
                ></img>
              </div>
              <div className="event-cards-info" onClick={() => history.push(`/events/${event.id}`)}>
                <p className="event-cards-info-time">
                  {event.startDate.split("T")[0]} · {"<"}
                  {event.startDate.split("T")[1].split(".")[0]}
                  {">"}
                </p>
                <p className="event-cards-info-name">{event.name}</p>
                <p className="event-cards-info-location">
                  {event.city}, {event.state}
                </p>
              </div>
              <div className="event-cards-description" onClick={() => history.push(`/events/${event.id}`)}>
                <p>{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
