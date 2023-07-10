import React, { useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as groupDetails from "../../store/groups";
import * as sessionActions from "../../store/session";
import { GroupEvents } from "./GroupEvents";
import "./GroupDetails.css";
import DeleteGroup from "../DeleteGroupModal";
import OpenModalButton from "../OpenModalButton";

const GroupDetails = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const history = useHistory();
  const groupInfo = useSelector((state) => state.groups.individualGroup);
  const currentUser = useSelector((state) => state.session.user);


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

  const createEvent = () => {
    history.push(`/groups/${groupId}/events/new`);
  };

  const updateGroup = () => {
    history.push(`/groups/${groupId}/edit`);
  };

  const joinGroup = () => {
    alert("Feature coming soon!");
  };
  const eventsCheck = () => {
    if (groupInfo.Events.length < 0) {
    } else {
      return <GroupEvents events={groupInfo.Events} />;
    }
  };

  const navigateToEvent = (eventId) => {
    history.push(`/events/${eventId}`);
  };

  const eventsLengthCheck = () => {
    if (groupInfo.Events === undefined) {
      return "0";
    } else {
      return groupInfo.Events.length;
    }
  };

  return (
    <>
      <div className="group-details-page">
        <div className="group-details-container"></div>
        <div className="return-nav">
          <p className="arrow">&lt;</p>
          <p className="return-btn" onClick={returnGroups}>
            Groups
          </p>
        </div>
        <div className="group-individual-header">
          <img src={previewImage} alt="Group Preview" className="group-image" />
          <div className="group-info">
            <h2 className="group-name">{groupInfo.name}</h2>
            <p className="group-location">
              {groupInfo.city}, {groupInfo.state}
            </p>
            <div className="group-membership">
              {/* <p>{groupInfo.numMembers} Members</p> */}
              <p>{groupInfo.Events.length} Events</p>
              <p>{groupInfo.private ? "Private" : "Public"}</p>
            </div>
            <p>
              Organized by &nbsp;
              <span className="organizer">
                {groupInfo["Organizer"].firstName} {groupInfo["Organizer"].lastName}
              </span>
            </p>
            <div className="buttons-container-groups">
              {!currentUser || currentUser.id !== groupInfo.Organizer.id ? (
                <button className="join" onClick={joinGroup}>
                  Join this Group
                </button>
              ) : (
                <>
                  <button className="create" onClick={createEvent}>
                    Create Event
                  </button>
                  <button className="update" onClick={updateGroup}>
                    Update
                  </button>
                  <OpenModalButton
                    className="delete"
                    modalComponent={<DeleteGroup groupId={groupId}/>}
                    buttonText={"Delete"}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="about-events-section">
          <div className="group-detail-about">
            <div className="organizer-body">
              <h3>Organizer</h3>
              <p className="organizer-name">
                {groupInfo["Organizer"].firstName} {groupInfo["Organizer"].lastName}
              </p>
            </div>
            <h3>What we're about</h3>
            <p>{groupInfo.about}</p>
          </div>
        </div>
        <div className="group-event-area">
        <div className="upcoming-events">
          {eventsCheck()}
        </div>
      </div>
      </div>
    </>
  );
};

export default GroupDetails;
