import React, { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllGroups } from "../../store/groups";

const Groups = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetAllGroups());
  }, [dispatch]);

  return (
    <>
      <h1>Hi</h1>
    </>
  );
};

export default Groups;
