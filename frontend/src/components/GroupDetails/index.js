import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneGroup } from "../../store/groups";
import "./GroupDetails.css";

const GroupDetails = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const groupInfo = useSelector((state) => state.groups.singleGroup);

  useEffect(() => {
    dispatch(thunkGetOneGroup(groupId));
  }, [dispatch, groupId]);

  const returnGroups = () => {
    history.push("/groups");
  };

  const comingSoon = () => {
    alert("Feature coming soon!");
  };

  if (!groupInfo.id || Number(groupInfo.id) !== Number(groupId)) {
    return null;
  }

  const { GroupImages, name, city, state, numMembers, private: isPrivate, Organizer, about } = groupInfo;
  const images = GroupImages || [];
  const previewImage = images.find((img) => img.preview)?.url;

  return (
    <div className="group-details-page">
      <div className="return-nav">
        <button className="return-btn" onClick={returnGroups}>
          Return to Groups
        </button>
      </div>
      <div className="group-header">
        <img
          src={previewImage}
          alt="Group Preview"
          className="group-image"
        />
      </div>
      <div className="group-info">
        <h2 className="group-name">{name}</h2>
        <p className="group-location">{city}, {state}</p>
        <div className="group-membership">
          <p>{numMembers} Members</p>
          <p>&bull;</p>
          <p>{isPrivate ? "Private" : "Public"}</p>
        </div>
        <p>
          Organized by&nbsp;
          <span className="organizer">
            {Organizer.firstName} {Organizer.lastName}
          </span>
        </p>
      </div>
      <div className="about">
        <h3>About</h3>
        <p>{about}</p>
      </div>
      <button className="JoinButton" onClick={comingSoon}>
        Join this group
      </button>
    </div>
  );
};

export default GroupDetails;
