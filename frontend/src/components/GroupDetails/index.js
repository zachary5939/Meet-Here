import React, { useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneGroup } from "../../store/groups";
import "./GroupDetails.css";
import * as groupDetails from '../../store/groups';
import GroupEvents from "./GroupEvents";
import DeleteGroup from "../DeleteGroupModal";
import CreateEvent from "../CreateEvent";
import OpenModalButton from "../OpenModalButton";

const GroupDetails = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const groupInfo = useSelector((state) => state.groups.singleGroup);
  const eventsState = useSelector((state) => state.events.allEvents);
  const events = Object.values(eventsState || {}).filter((event) => event.groupId === groupId);

  useEffect(() => {
    dispatch(thunkGetOneGroup(groupId));
  }, [dispatch, groupId]);

  const returnGroups = () => {
    history.push("/groups");
  };

  const comingSoon = () => {
    alert("Feature coming soon!");
  };

  const createEvent = () => {
    history.push(`/groups/${groupId}/events/new`);
  };

  const editGroup = () => {
    history.push(`/groups/${groupId}/edit`);
  };

  if (!groupInfo.id || Number(groupInfo.id) !== Number(groupInfo.id)) {
    return null;
  }

  let availability;
  if (user && groupInfo) {
    if (user && groupInfo && user.id === groupInfo["Organizer"]?.id) {
      availability = [
        <button key={1} className="create-button" onClick={createEvent}>
          Create Event
        </button>,
        <button key={2} className="edit-button" onClick={editGroup}>
          Update Group
        </button>,
        <OpenModalButton
          key={3}
          buttonText="Delete Group"
          modalComponent={<DeleteGroup type="groupInfo" what={groupInfo} path="/groups" />}
        />,
      ];
    } else {
      availability = [
        <button key={1} className="join-button" onClick={comingSoon}>
          Join this Group!
        </button>,
      ];
    }
  }

  const { GroupImages, name, city, state, numMembers, private: isPrivate, Organizer, about } = groupInfo;
  const images = GroupImages || [];
  const previewImage = images.find((img) => img.preview)?.url;

  return (
<div className="content-container">
        <div className="upper-container">
          <div className="return-to">
          <i class="fa-solid fa-arrow-left"></i>
            <NavLink to="/groups">Return to All Groups</NavLink>
          </div>
          <div className="upper-content">
            <div className="group-image-container">
              <img alt="group pic" src={groupInfo.GroupImages[0].url} />
            </div>
            <div className="content-details">
              <div className="group-details">
                <h1>{groupInfo.name}</h1>
                <div className="group-details-list">
                  <div className="group-detail">
                    <i class="fa-solid fa-location-dot"></i>
                    <p>{groupInfo.city}, {groupInfo.state}</p>
                  </div>
                  <div className="group-detail">
                    <i class="fa-solid fa-users"></i>
                    <p>{groupInfo.numMembers} members &#8226; {groupInfo.private ? "Private" : "Public"}</p>
                  </div>
                  <div className="group-detail">
                    <i class="fa-solid fa-crown"></i>
                    <p>Organized by {groupInfo.Organizer.firstName} {groupInfo.Organizer.lastName}</p>
                  </div>
                </div>
              </div>
              <div className="buttons">
                {user ? (
                  user.id !== groupInfo.Organizer.id ? (
                    <button onClick={comingSoon}>Join this group</button>
                  ) : (
                    <div className="organizer-buttons">
                      <button onClick={createEvent}>Create event</button>
                      <button onClick={editGroup}>Update</button>
                      <OpenModalButton modalComponent={<DeleteGroup />} buttonText={'Delete'}/>
                    </div>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
          <div className="gray-container">
            <div className="gray-content">
              <h2>Organizer</h2>
              <span>{groupInfo.Organizer.firstName} {groupInfo.Organizer.lastName}</span>
              <h2>What we're about</h2>
              <p>{groupInfo.about}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae.</p>
              <div className="content-events">
                <h2>Upcoming Events ({events.length})</h2>
                <div className="event-card">
                  {events && events.map(event => (
                    <GroupEvents key={event.id} event={event} group={groupInfo} />
                  ))}
                </div>
              </div>
            </div>
          </div>
      </div>
  );
};

export default GroupDetails;
