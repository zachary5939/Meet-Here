import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllGroups } from "../../store/groups";
import { GroupRecord } from "./GroupRecord";
import "./Groups.css";

function GroupPage() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups?.allGroups);
  const normalizedGroups = groups ? Object.values(groups) : [];

  useEffect(() => {
    dispatch(thunkGetAllGroups());
  }, [dispatch]);

  return (
    <>
      <div className="group-list">
        <h3>{groups}</h3>
        <div className="group-header">
          <Link className="group-list-header-events" to="/events">
            Events
          </Link>
          <Link className="group-list-header-groups" to="/groups">
            Groups
          </Link>
          <p>Groups in Connect</p>
        </div>
        {normalizedGroups.map((group) => (
          <GroupRecord group={group} key={group.id} />
        ))}
      </div>
    </>
  );
}

export default GroupPage;
