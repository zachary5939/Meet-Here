import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllGroups } from "../../store/groups";
import { GroupRecord } from "./GroupRecord";
import * as groupActions from "../../store/groups";
import "./Groups.css";

function GroupPage() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups);
  const groupInfo = useSelector((state) => state.groups.individualGroup);
  const normalizedGroups =
    groups && groups.allGroups ? Object.values(groups.allGroups) : [];

  useEffect(() => {
    dispatch(groupActions.thunkGetAllGroups());
  }, [dispatch]);

  return (
    <>
      <div className="group-list">
        <div className="group-header">
          <Link className="group-list-header-events" to="/events">
            Events
          </Link>
          <Link className="group-list-header-groups" to="/groups">
            Groups
          </Link>
          <p>Groups in Meet Here</p>
        </div>
        <p className="group-list-item"></p>
        {normalizedGroups.map((group) => (
          <React.Fragment key={group.id}>
            <GroupRecord group={group} />
            <p className="group-list-item"></p>
          </React.Fragment>

        ))}
      </div>
    </>
  );
}

export default GroupPage;
