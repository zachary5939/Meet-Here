import React, { useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as groupDetails from '../../store/groups';
import * as eventDetails from '../../store/events';
import { GroupEvents } from "./GroupEvents"
import "./GroupDetails.css";
import DeleteGroup from "../DeleteGroupModal";
import CreateEvent from "../CreateEvent";
import OpenModalButton from "../OpenModalButton";

const GroupDetails = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const { eventId } = useParams();
  const history = useHistory();
  const groupInfo = useSelector((state) => state.groups.individualGroup);
  const eventInfo = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(eventDetails.thunkGetEventDetail(groupId));
  }, [dispatch, groupId, eventId]);

    useEffect(() => {
      dispatch(groupDetails.thunkGetGroupDetails(groupId));
    }, [dispatch, groupId]);

    if (!groupInfo.id || Number(groupInfo.id) !== Number(groupId)) return null;

    const { GroupImages, name, city, state, numMembers, private: isPrivate, Organizer, about } = groupInfo;
    const images = GroupImages || [];
    const previewImage = images.find((img) => img.preview)?.url;

    const returnGroups = () => {
      history.push("/groups");
    };

    const comingSoon = () => {
      alert("Feature coming soon!");
    };

    const createEvent = () => {
      history.push(`/groups/${groupId}/events/new`)
    };

    const updateGroup = () => {
      history.push(`/groups/${groupId}/edit`)
    };

    const eventsCheck = () => {
      console.log('eventscheck', eventInfo)
      if (eventInfo === undefined) {
        return <h3 style={{ marginTop: ".2rem" }}>No Upcoming Events</h3>;
      } else {
        return (
          <GroupEvents events={eventInfo} />
        );
      }
    };

    const navigateToEvent = (eventId) => {
      history.push(`/events/${eventId}`);
    };

    const eventsLengthCheck = () => {
      console.log()
      if (groupInfo.Events === undefined) {
        return "0";
      } else {
        return groupInfo.Events.length;
      }
    };

    return (
   <>
      <div className="group-details-page">
      <div className="group-details-container">
      </div>
        <div className="return-nav">
          <button className="return-btn" onClick={returnGroups}>
            Return to Groups
          </button>
        </div>
        <div className="group-individual-header">
          <img src={previewImage} alt="Group Preview" className="group-image" />

        <div className="group-info">
          <h2 className="group-name">{groupInfo.name}</h2>
          <p className="group-location">
            {groupInfo.city}, {groupInfo.state}
          </p>
          <div className="group-membership">
            <p>{groupInfo.numMembers} Members</p>
            <p>&bull;</p>
            <p>{groupInfo.private ? "Private" : "Public"}</p>
          </div>
          <p>
            Organized by &nbsp;
            <span className="organizer">
              {groupInfo["Organizer"].firstName} {groupInfo["Organizer"].lastName}
            </span>
          </p>
        <div className="buttons-container-groups">
          <button className="create-event-button" onClick={createEvent}>
            Create Event
          </button>
          <button className="update-group-button" onClick={updateGroup}>
            Update
          </button>
          <OpenModalButton classname="delete-group-button" modalComponent={<DeleteGroup />} buttonText={'Delete'}/>
          </div>
        </div>
        </div>
          </div>
          <div className="about-events-section">
          <div className="about">
          <div className="organizer-body">
              <h3>Organizer</h3>
              <p className="organizer-name">{groupInfo["Organizer"].firstName} {groupInfo["Organizer"].lastName}</p>
          </div>
            <h3>What we're about</h3>
            <p>{groupInfo.about}</p>
          </div>
          <div className="upcoming-events">
            <h3>Upcoming Events ({eventsLengthCheck()})</h3>
            {eventsCheck()}
          </div>
          </div>
      </>
    );

  };

export default GroupDetails;
