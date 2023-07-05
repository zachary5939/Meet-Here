import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import * as groupDetails from "../../store/groups";
import { useDispatch, useSelector } from "react-redux"
import "./GroupDetails.css";


export const GroupDetails = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const history = useHistory()
    const user = useSelector((state) => state.session.user);
    const groupInfo = useSelector((state) => state.groups.singleGroup);
    const groupStore = useSelector((state) => state.groups);

    useEffect(() => {
        dispatch(groupDetails.thunkGetOneGroup(groupId));
    }, [dispatch, groupId]);

    if (!groupInfo.id || Number(groupInfo.id) !== Number(groupId)) return null;

    const images = groupInfo["GroupImages"];

    const previewImage = images.find((img) => img.preview)?.url;

    const returnGroups = () => {
        history.push("/groups");
    }

    const comingSoon = () => {
        alert("Feature coming soon!");
    }




return (
    groupInfo && (
        <div className="group-details-page">
        <div className="return-nav">
          <button className="return-btn" onClick={returnGroups}>
            Return to Groups
          </button>
          </div>
          </div>
    )
)

}

export default GroupDetails
