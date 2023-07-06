import React, { useEffect } from "react";
import { useParams} from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetEventDetail } from "../../store/events";
import "./EventDetails.css";
import { EventDeleteButton } from "./EventDeleteButton";

 const EventDetail = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const history = useHistory();
  const event = useSelector((state) => state.events.singleEvent);
  const eventStore = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(thunkGetEventDetail(eventId));
  }, [dispatch, eventId]);


  const eventPrivateCheck = () => {
    if (event?.Group?.private === true) {
      return "Private";
    } else {
      return "Public";
    }
  };

  const sendToGroup = () => {
    history.push(`/groups/${event.Group.id}`);
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
      <div className="event-container">
        <h2>{event.name}</h2>
        <p>{"<"}</p>
      </div>
    </>
  );
};

export default EventDetail;
