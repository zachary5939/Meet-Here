import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetEventDetail } from "../../store/events";
import "./EventDetails.css";
import OpenModalButton from "../OpenModalButton";
import { DeleteEvent } from "../DeleteEventModal";

export const EventDetail = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const eventInfo = useSelector((state) => state.events);
  const session = useSelector((state) => state.session); // Get the session information
  console.log("event info", eventInfo);
  const events = eventInfo.singleEvents[eventId];
  const history = useHistory();

  useEffect(() => {
    dispatch(thunkGetEventDetail(eventId));
  }, [dispatch, eventId]);

  if (!events) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
      </div>
    );
  }

  const event = events.event;

  const sendToGroup = () => {
    history.push(`/groups/${event.Group.id}`);
  };

  const imageCheck = () => {
    if (
      event.previewImage === "no preview image" ||
      event.previewImage === undefined
    ) {
      event.previewImage =
        "https://images.unsplash.com/photo-1623018035782-b269248df916?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80";
    } else {
      return `${event.EventImages[0].url}`;
    }
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

  const editEvent = () => {
    history.push(`/events/${eventId}/edit`);
  };

  const isOrganizer = session?.user?.id === event?.Group?.Organizer?.id; // Check if the user is signed in and the necessary data exists

  return (
    <>
      <div className="event-detail-container">
        <div className="event-detail-breadcrumb">
          <p>{"<"}</p>
          <Link to="/events">Events</Link>
        </div>
        <div className="event-detail-header-container">
          <h2>{event.name}</h2>
          <p>
            Hosted by {event.Group.Organizer.firstName}{" "}
            {event.Group.Organizer.lastName}
          </p>
        </div>
      </div>
      <div className="event-detail-body-container">
        <div className="event-detail-body-info">
          <img
            alt=""
            className="event-detail-body-image"
            width="500"
            height="300"
            src={imageCheck()}
          />
          <div className="event-detail-body-info-group">
            <img
              alt=""
              onClick={sendToGroup}
              className="event-detail-body-info-group-image"
              width="110"
              height="75"
              src={`${event.Group.GroupImages[0].url}`}
            />
            <div className="event-detail-body-info-group-body">
              <h4 onClick={sendToGroup}>{event.Group.name}</h4>
            </div>
          </div>
        </div>
        <div className="event-detail-body-info-event">
          <div className="event-detail-body-info-event-time-details">
            <div className="event-detail-body-info-event-details-time-container">
              <i className="far fa-regular fa-clock fa-lg"></i>
              <div className="event-detail-body-info-event-details-start-time">
                <span>START </span>
                <div className="START">
                  {event.startDate.split("T")[0]} · {}
                  {event.startDate.split("T")[1].split(".")[0]}
                </div>
              </div>
              <div className="event-detail-body-info-event-details-end-time">
                <span>END </span>
                <div className="END">
                  {event.endDate.split("T")[0]} · {}
                  {event.endDate.split("T")[1].split(".")[0]}
                </div>
              </div>
            </div>
          </div>
          <div className="event-detail-body-info-event-price-details">
            <p>{eventPrice()}</p>
          </div>
          <div className="event-detail-body-info-event-type-details">
            <p>{event.type}</p>
          </div>
          <div className="event-delete">
            {isOrganizer && session.user && ( // Render the button only if the user is signed in and is the organizer
              <OpenModalButton
                className="event-delete-button"
                modalComponent={<DeleteEvent eventId={eventId} groupId={event.Group.id} />}
                buttonText={"Delete"}
              />
            )}
          </div>
        </div>
        <div className="event-detail-body-description">
          <h2>Details</h2>
          <p>{event.description}</p>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
