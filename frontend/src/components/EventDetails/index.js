import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetEventDetail } from "../../store/events";
import "./EventDetails.css";
import { EventDeleteButton } from "./EventDeleteButton";

export const EventDetail = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const eventInfo = useSelector((state) => state.events);
  const event = eventInfo[eventId];
  const history = useHistory();
  console.log("eeee", event)

  useEffect(() => {
    dispatch(thunkGetEventDetail(eventId));
  }, [dispatch, eventId]);

  if (!event) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
      </div>
    );
  }

  const sendToGroup = () => {
    history.push(`/groups/${event.Group.id}`);
  };

  const imageCheck = () => {
    // Your image rendering logic here
  };

  const eventPrice = () => {
    if (event.price <= 0) {
      return "FREE";
    } else {
      return `Price: $${event.price}`;
    }
  };

  const returnEvents = () => {
    history.push("/events");
  };

  const comingSoon = () => {
    alert("Feature coming soon!");
  };

  const onClickEdit = () => {
    history.push(`/events/${eventId}/edit`);
  };

  return (
    <>
      <div className="event-detail-container">
        <div className="event-detail-breadcrumb">
          <p>{"<"}</p>
          <Link to="/events">Events</Link>
        </div>
        <div className="event-detail-header-container">
          <h2>{event.name}</h2>
          <p>Hosted by {event.Group.firstName} {event.Group.lastName}</p>
        </div>
      </div>
      <div className="event-detail-body-container">
        <div className="event-detail-body-info">
          <div className="event-detail-body-info-group-body">
            <h4 onClick={sendToGroup}>{event.Group.name}</h4>
          </div>
        </div>
        <div className="event-detail-body-info-event">
          <div className="event-detail-body-info-event-time-details">
            <i
              className="far fa-clock fa-lg"
              style={{ color: "#CCCCCC" }}
            ></i>
            <div className="event-detail-body-info-event-details-time-container">
              <div className="event-detail-body-info-event-details-start-time">
                <span>START </span>
                <div>
                  {event.startDate.split("T")[0]} · {}
                  {event.startDate.split("T")[1].split(".")[0]}
                </div>
              </div>
              <div className="event-detail-body-info-event-details-end-time">
                <span>END </span>
                <div>
                  {event.endDate.split("T")[0]} · {}
                  {event.endDate.split("T")[1].split(".")[0]}
                </div>
              </div>
            </div>
          </div>
          <div className="event-detail-body-info-event-price-details">
            <i
              className="fa-solid fa-sack-dollar fa-xl"
              style={{ color: "#CCCCCC" }}
            ></i>
              <p>{eventPrice()}</p>
            </div>
            <div className="event-detail-body-info-event-type-details">
              <i className="fa-solid fa-map-pin fa-xl"></i>
              <p>{event.type}</p>
            </div>
            <div className="event-detail-body-info-event-button">{/* <EventDetailButton event={event} /> */}</div>
          </div>
        </div>
        <div className="event-detail-body-description">
          <h2>Details</h2>
          <p>{event.description}</p>
        </div>

    </>
  );
};

export default EventDetail;
